// const mongoose = require('mongoose');
// const request = require('supertest');
// const app = require('../../app');

// const {User} = require('../../models/users');

// const { DB_HOST, PORT } = process.env;

// describe("test register router", () => {
//     let server = {};
//     beforeAll(async () => {
//        server = app.listen(PORT);
//         await mongoose.connect(DB_HOST)
//     })
    
//     afterAll(async () => {
//         server.close();
//         await mongoose.connection.close();
//     })

//     afterEach(async () => {
//         await User.deleteMany({})
//      })

//     test('test register with correct data', async () => {
//         const registerData = {
//             name: 'Olesya',
//             email: 'test@example.com',
//             password: '123456'
//         }; 
        
//     const { statusCode, body } = await request(app).post('/api/auth/register').send(registerData);
//     expect(statusCode).toBe(201);
//     expect(body.user.name).toBe(registerData.name);
//     expect(body.user.email).toBe(registerData.email);
    
//     const user = await User.findOne({ email: registerData.email})
//     expect(user.email).toBe(registerData.email);
//     })
// })
 