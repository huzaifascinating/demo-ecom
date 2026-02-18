// Get and clean environment variables
const SHOPIFY_DOMAIN_RAW = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '').trim();
const STOREFRONT_TOKEN_RAW = (import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '').trim();

// Remove quotes if present (some .env files have quotes around values)
const SHOPIFY_DOMAIN = SHOPIFY_DOMAIN_RAW.replace(/^["']|["']$/g, '').trim();
const STOREFRONT_TOKEN = STOREFRONT_TOKEN_RAW.replace(/^["']|["']$/g, '').trim();

const shopifyFetch = async (query: string, variables = {}) => {
  // Validate domain is set
  if (!SHOPIFY_DOMAIN) {
    console.error('❌ Shopify domain is missing! Check your .env file has VITE_SHOPIFY_STORE_DOMAIN set (without quotes)');
    throw new Error('Shopify store domain is not configured. Please set VITE_SHOPIFY_STORE_DOMAIN in your .env file.');
  }

  // Clean domain: remove protocol, trailing slashes, and any whitespace
  const cleanDomain = SHOPIFY_DOMAIN
    .replace(/^https?:\/\//, '') // Remove http:// or https://
    .replace(/\/$/, '') // Remove trailing slash
    .trim();

  if (!cleanDomain) {
    throw new Error('Invalid Shopify domain format. Domain cannot be empty.');
  }

  const url = `https://${cleanDomain}/api/2024-10/graphql.json`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const json = await response.json();
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('GraphQL execution errors occurred');
    }
    return json.data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
};

export const fetchShopifyProducts = async (): Promise<any[]> => {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    console.warn('Shopify Config Missing');
    return [];
  }

  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            productType
            variants(first: 5) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query);
    return data.products.edges.map(({ node }: any) => {
      const variant = node.variants.edges[0]?.node;
      const images = node.images.edges;
      const numericId = node.id.split('/').pop();

      return {
        id: numericId || node.id,
        variantId: variant?.id,
        name: node.title,
        price: parseFloat(variant?.price?.amount || '0'),
        originalPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
        image: images.length > 0 ? images[0].node.url : '',
        category: (node.productType || '').toLowerCase() || 'all',
        rating: 4.5,
        reviews: Math.floor(Math.random() * 500) + 50,
        description: node.description,
      };
    });
  } catch (_error) {
    return [];
  }
};

export const fetchShopifyProductById = async (id: string): Promise<any | null> => {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) return null;

  const gid = id.includes('gid://') ? id : `gid://shopify/Product/${id}`;

  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        productType
        variants(first: 5) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { id: gid });
    if (!data.product) return null;

    const node = data.product;
    const variants = node.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      price: parseFloat(edge.node.price?.amount || '0'),
      compareAtPrice: edge.node.compareAtPrice ? parseFloat(edge.node.compareAtPrice.amount) : undefined,
    }));
    const variant = variants[0]; // Default to first variant for backward compatibility
    const images = node.images.edges;
    const numericId = node.id.split('/').pop();

    return {
      id: numericId || node.id,
      variantId: variant?.id,
      variants: variants, // Include all variants
      name: node.title,
      price: variant?.price || 0,
      originalPrice: variant?.compareAtPrice,
      images: images.map((img: any) => img.node.url),
      image: images.length > 0 ? images[0].node.url : '',
      category: (node.productType || '').toLowerCase() || 'all',
      rating: 4.9,
      reviews: 2400,
      description: node.description,
    };
  } catch (_error) {
    return null;
  }
};

// --- CART OPERATIONS ---

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        attributes {
          key
          value
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              url
            }
            price {
              amount
            }
            product {
              id
              title
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
  }
`;

export const createShopifyCart = async (variantId: string, quantity: number, attributes?: { key: string, value: string }[]) => {
  const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;
  const variables = {
    input: {
      lines: [{
        merchandiseId: variantId,
        quantity,
        attributes: attributes || []
      }],
    },
  };
  const data = await shopifyFetch(query, variables);
  return data.cartCreate.cart;
};

export const getShopifyCart = async (cartId: string) => {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_FRAGMENT}
      }
    }
  `;
  const data = await shopifyFetch(query, { cartId });
  return data.cart;
};

export const addToShopifyCart = async (cartId: string, variantId: string, quantity: number, attributes?: { key: string, value: string }[]) => {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{
      merchandiseId: variantId,
      quantity,
      attributes: attributes || []
    }],
  };
  const data = await shopifyFetch(query, variables);
  return data.cartLinesAdd.cart;
};

export const removeFromShopifyCart = async (cartId: string, lineIds: string[]) => {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;
  const variables = { cartId, lineIds };
  const data = await shopifyFetch(query, variables);
  return data.cartLinesRemove.cart;
};

export const updateShopifyCartQuantity = async (cartId: string, lineId: string, quantity: number) => {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FRAGMENT}
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };
  const data = await shopifyFetch(query, variables);
  return data.cartLinesUpdate.cart;
};

export const updateShopifyCartAttributes = async (cartId: string, attributes: { key: string, value: string }[]) => {
  const query = `
    mutation cartAttributesUpdate($attributes: [AttributeInput!]!, $cartId: ID!) {
      cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
        cart {
          id
          attributes {
            key
            value
          }
        }
      }
    }
  `;
  const variables = { cartId, attributes };
  const data = await shopifyFetch(query, variables);
  return data.cartAttributesUpdate.cart;
};
