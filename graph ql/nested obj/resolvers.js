const mockUser = {
  name: "Vipin Sohal",
  age: 21,
  enrolledCourse: {
    courseName: "Advanced Web Technologies",
    duration: "6 Months"
  }
};

const resolvers = {
  Query = {
    getUser: () => mockUser,
  },
};

module.exports = resolvers;