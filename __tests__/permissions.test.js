const supertest = require('supertest')
const { server } = require('../server')
const { sequelize } = require('../models/index')
const request = supertest(server)
const { person, item } = require('../models/index')
const base64 = require('base-64')

let user;
const basic = base64.encode("test:test123")

beforeAll(async() => {
    await sequelize.sync()
    user = await person.create({username: "test", password: "test123", role: "writer" })
    await item.create({name: "baseball", quantity: 0 })
    await item.create({name: "basketball", quantity: 5 })
    await item.create({name: "football", quantity: 3 })
    await item.create({name: "kite", quantity: 0 })
})

afterAll(async() => {
    await sequelize.drop()
    await sequelize.close()
})

describe('Protected routes tests', () => {

    it('Should allow creation of an object', async() => {

        const product = {
            name: "baseball",
            quantity: 10
        }

        const response = await request.post('/item').send(product).set(`Authorization`, `Bearer ${user.token}`)

        expect(response.status).toEqual(201)
        expect(response.body.name).toEqual("baseball")
        expect(response.body.quantity).toEqual(10)
        expect(response.body.inStock).toEqual(true)

    })

    it('Should get all items', async() => {

        const response = await request.get('/item').set(`Authorization`, `Basic ${basic}`)

        expect(response.status).toEqual(200)
    })

    it('Should get a specific item', async() => {

        const response = await request.get('/item/1').set(`Authorization`, `Basic ${basic}`)

        expect(response.status).toEqual(200)
        expect(response.body.name).toEqual("baseball")
        expect(response.body.quantity).toEqual(0)
        expect(response.body.inStock).toEqual(false)
    })

    it('Should deny access trying to update an item', async() => {

        const newProductDetails = {
            name: "basketball",
            quantity: 5
        }

        const response = await request.put('/item/1').send(newProductDetails).set(`Authorization`, `Bearer ${user.token}`)

        expect(response.status).toEqual(403)
        expect(response.text).toEqual('Access Denied')

    })

    it('Should deny access trying to delete an item', async() => {

        const response = await request.delete('/item/1').set(`Authorization`, `Bearer ${user.token}`)

        expect(response.status).toEqual(403)
        expect(response.text).toEqual("Access Denied")

    })

})