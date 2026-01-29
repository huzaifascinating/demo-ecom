const SHOPIFY_DOMAIN = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '').trim();
const STOREFRONT_TOKEN = (import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '').trim();

export const fetchShopifyProducts = async (): Promise<any[]> => {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    console.warn('Shopify Config Missing:', { SHOPIFY_DOMAIN, hasToken: !!STOREFRONT_TOKEN });
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

  const url = `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`;

  try {
    console.log('Shopify Request URL:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error('GraphQL Errors:', errors);
      throw new Error('GraphQL execution errors occurred');
    }

    return data.products.edges.map(({ node }: any) => {
      const variant = node.variants.edges[0]?.node;
      const images = node.images.edges;

      // Extract numeric ID from Global ID (gid://shopify/Product/12345)
      // This prevents routing issues caused by slashes in the ID
      const numericId = node.id.split('/').pop();

      return {
        id: numericId || node.id,
        name: node.title,
        price: parseFloat(variant?.price?.amount || '0'),
        originalPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
        image: images.length > 0 ? images[0].node.url : '',
        category: (node.productType || '').toLowerCase() || 'all',
        rating: 4.5, // Mocked
        reviews: Math.floor(Math.random() * 500) + 50, // Mocked
        description: node.description,
      };
    });
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
};

export const fetchShopifyProductById = async (id: string): Promise<any | null> => {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) return null;

  // Reconstruct Global ID if it's just a numeric ID
  const gid = id.includes('gid://') ? id : `gid://shopify/Product/${id}`;

  const query = `
    {
      product(id: "${gid}") {
        id
        title
        description
        productType
        variants(first: 1) {
          edges {
            node {
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

  const url = `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error(`Shopify API error: ${response.statusText}`);

    const { data, errors } = await response.json();
    if (errors || !data.product) return null;

    const node = data.product;
    const variant = node.variants.edges[0]?.node;
    const images = node.images.edges;
    const numericId = node.id.split('/').pop();

    return {
      id: numericId || node.id,
      name: node.title,
      price: parseFloat(variant?.price?.amount || '0'),
      originalPrice: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
      images: images.map((img: any) => img.node.url),
      image: images.length > 0 ? images[0].node.url : '',
      category: (node.productType || '').toLowerCase() || 'all',
      rating: 4.9, // Mocked
      reviews: 2400, // Mocked
      description: node.description,
    };
  } catch (error) {
    console.error('Error fetching Shopify product:', error);
    return null;
  }
};
