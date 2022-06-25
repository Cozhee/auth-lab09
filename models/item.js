const itemModel = (sequelize, DataTypes) => {
    const model = sequelize.define('item', {
        name: {
            type: DataTypes.STRING,
            required: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            required: true
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })

    model.beforeCreate((item) => {
        if (item.quantity <= 0) {
            item.inStock = false
        }
    })

    model.beforeUpdate((item) => {
        if (item.quantity <= 0) {
            item.inStock = false
        } else {
            item.inStock = true
        }
    })

    return model
}

module.exports = itemModel