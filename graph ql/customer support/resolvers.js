let users = [
  { id: 1, name: "Amit Sharma", email: "amit@gmail.com", city: "Delhi" },
  { id: 2, name: "Priya Verma", email: "priya@gmail.com", city: "Mumbai" },
  { id: 3, name: "Rahul Mehta", email: "rahul@gmail.com", city: "Bangalore" }
];

let queries = [
  { id: 1, title: "How to reset password?" },
  { id: 1, title: "Unable to update profile" },
  { id: 2, title: "Login authentication issue" }
];

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(u => u.id == id),
    queries: () => queries,
    usersByCity: (_, { city }) => users.filter(u => u.city.toLowerCase() === city.toLowerCase()),
    totalUsers: () => users.length,
    totalQueries: () => queries.length,
    searchUser: (_, { name }) => users.filter(u => u.name.toLowerCase().includes(name.toLowerCase())),
    usersWithQueryCount: () => {
      return users.map(user => {
        const count = queries.filter(q => q.id == user.id).length;
        return {
          name: user.name,
          totalQueries: count
        };
      });
    }
  },

  User: {
    queries: (parent) => queries.filter(q => q.id == parent.id)
  },

  Mutation: {
    addUser: (_, { name, email, city }) => {
      const newUser = { id: users.length + 1, name, email, city };
      users.push(newUser);
      return newUser;
    },
    addSupportQuery: (_, { id, title }) => {
      const newQuery = { id: Number(id), title };
      queries.push(newQuery);
      return newQuery;
    },
    updateUserCity: (_, { id, city }) => {
      const user = users.find(u => u.id == id);
      if (user) {
        user.city = city;
      }
      return user;
    },
    updateUserEmail: (_, { id, email }) => {
      const user = users.find(u => u.id == id);
      if (user) {
        user.email = email;
      }
      return user;
    },
    deleteUser: (_, { id }) => {
      const userExists = users.some(u => u.id == id);
      if (!userExists) return "User not found";
      users = users.filter(u => u.id != id);
      queries = queries.filter(q => q.id != id);
      return "User and their related queries deleted successfully";
    },
    deleteSupportQuery: (_, { id, title }) => {
      const initialLength = queries.length;
      queries = queries.filter(q => !(q.id == id && q.title === title));
      if (queries.length === initialLength) return "Query not found";
      return "Support query deleted successfully";
    }
  }
};

module.exports = resolvers;