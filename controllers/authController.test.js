// const mongoose = require('mongoose');
// const request = require('supertest');
// const app = require('../app');

// const { DB_HOST } = process.env;

// describe('test login controller', () => {
//     beforeAll(() => mongoose.connect(DB_HOST));
//     afterEach(async () => {
//     await mongoose.disconnect();
//   });
//     test("response status should be 200", async () => {
//     const res = await request(app)
//       .post("/api/users/login")
//       .send({
//         email: "test@gmail.com",
//         password: "test1234",
//       })
//     .expect(200);
//   });
//  });