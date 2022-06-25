const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET || 'secretteststringyouwouldneverguess'

const personModel = (sequelize, DataTypes) => {
    const model = sequelize.define('person', {
        username: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            required: true,

        },
        role: {
            type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
            required: true,
            defaultValue: 'user'
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, SECRET);
            },
            set(tokenObj) {
                return jwt.sign(tokenObj, SECRET);
            }
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    user: ['read'],
                    writer: ['create', 'read'],
                    editor: ['create', 'read', 'update'],
                    admin: ['create', 'read', 'update', 'delete']
                }
                return acl[this.role]
            }
        }
    })

    model.beforeCreate(async (person) => {
        person.password = await bcrypt.hash(person.password, 5)
    })

    model.authenticateBasic = async function(username, password) {
        const user = await this.findOne({ where: { username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) { return user; }
        throw new Error('Invalid User');
    }

    model.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const user = this.findOne({where: { username: parsedToken.username } });
            if (user) { return user; }
        } catch (e) {
            throw new Error(e.message)
        }
    };

    return model
 }

 module.exports = personModel