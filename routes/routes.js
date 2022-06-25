const express = require('express')
const router = express.Router()
const { person } = require('../models/index')
const model = require('../models')
const basicAuth = require('../middleware/basic')
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl')


router.post('/signup', async(req, res) => {
    try {
        const info = req.body
        const user = await person.create(info)
        res.status(200).send(user)
    } catch(err) {
        res.status(404).send('Could not create user')
    }
})

router.post('/signin', basicAuth, async(req, res) => {

    res.status(200).send(req.user)

})

router.param('model', (req, res, next) => {
    const modelName = req.params.model
    if (model[modelName]) {
        req.model = model[modelName]
        next()
    } else {
        next('Invalid model')
    }
})

router.get('/:model', basicAuth, handleGetAll);
router.get('/:model/:id', basicAuth, handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);



async function handleCreate(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
}

async function handleGetAll(req, res) {
    let allRecords = await req.model.findAll({});
    res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.findOne({where: { id: id }})
    res.status(200).json(theRecord);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const record = await req.model.findOne({where: { id: id}})
    let updatedRecord = await record.update(obj)
    res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    const record = await req.model.findOne({where: { id: id }})
    let deletedRecord = await record.destroy(id);
    res.status(200).json(deletedRecord);
}

module.exports = router

