let products = [
  { id: "1", title: "Laptop", price: 55000, category: "Electronics" },
  { id: "2", title: "Mobile", price: 25000, category: "Electronics" },
  { id: "3", title: "Shoes", price: 3000, category: "Fashion" }
];

const resolvers = {
  Query: {
    products: (_, { category }) => {
      if (category) {
        return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      return products;
    },
    product: (_, { id }) => products.find(p => p.id === id),
    totalProducts: () => products.length
  },

  Mutation: {
    addProduct: (_, { title, price, category }) => {
      const newProduct = {
        id: String(products.length + 1),
        title,
        price,
        category
      };
      products.push(newProduct);
      return newProduct;
    },
    updateProductPrice: (_, { id, price }) => {
      const product = products.find(p => p.id === id);
      if (product) {
        product.price = price;
      }
      return product;
    },
    deleteProduct: (_, { id }) => {
      const productExists = products.some(p => p.id === id);
      if (!productExists) return "Product not found";
      products = products.filter(p => p.id !== id);
      return "Product deleted successfully";
    }
  }
};

module.exports = resolvers;