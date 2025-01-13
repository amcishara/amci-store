import bcrypt from "bcryptjs";

const users = {
  users: [
    {
      name: "John",
      email: "john@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "jane@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: false,
    },
    {
      name: "Admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456", 10),
      isAdmin: true,
    },
  ],
};

export default users;
