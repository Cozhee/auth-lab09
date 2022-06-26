const supertest = require('supertest')
const { server } = require('../server')
const { sequelize } = require('../models/index')
const request = supertest(server)
const base64 = require('base-64')

// tests to write
// sign in
// sign up

beforeAll(async() => {
    await sequelize.sync()
})

afterAll(async() => {
    await sequelize.drop()
    await sequelize.close()
})

describe('Route tests', () => {

    it('Should create a person', async() => {
        const user = {
            username: "test",
            password: "test123"
        }
        const response = await request.post('/signup').send(user)
        expect(response.status).toEqual(201)
        expect(response.body.username).toEqual("test")
        expect(response.body.password).toBeTruthy()
        expect(response.body.password).not.toEqual("test123")
    })


    it('Should sign in a user', async() => {

        const login = { username: "test", password: "test123" }
        const basicStr = base64.encode("test:test123")

        const response = await request.post('/signin').send(login).set(`Authorization`, `Basic ${basicStr}`)

        expect(response.status).toEqual(200)
    })

})