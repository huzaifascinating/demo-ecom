const SHOPIFY_DOMAIN = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '').trim();
const STOREFRONT_TOKEN = (import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '').trim();

const shopifyFetch = async (query: string, variables = {}) => {
  const url = `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`;
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
            variants(first: 1) {
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
  } catch (error) {
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
        variants(first: 1) {
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
    const variant = node.variants.edges[0]?.node;
    const images = node.images.edges;
    const numericId = node.id.split('/').pop();

    return {
      id: numericId || node.id,
      variantId: variant?.id,
      name: node.title,
      price: parseFloat(variant?.price?.amount || '0'),
      originalPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
      images: images.map((img: any) => img.node.url),
      image: images.length > 0 ? images[0].node.url : '',
      category: (node.productType || '').toLowerCase() || 'all',
      rating: 4.9,
      reviews: 2400,
      description: node.description,
    };
  } catch (error) {
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

export const createShopifyCart = async (variantId: string, quantity: number) => {
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
      lines: [{ merchandiseId: variantId, quantity }],
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

export const addToShopifyCart = async (cartId: string, variantId: string, quantity: number) => {
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
    lines: [{ merchandiseId: variantId, quantity }],
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

