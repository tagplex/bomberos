module.exports = (sequelize, dataTypes) => {
    let alias = "Itemsvehicle";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_vehicle: {
            type: dataTypes.INTEGER
        },
        id_type_item: {
            type: dataTypes.DATE
        },
        brand: {
            type: dataTypes.STRING
        },
        model: {
            type: dataTypes.STRING
        },
        color: {
            type: dataTypes.INTEGER
        },
        serial: {
            type: dataTypes.INTEGER
        },
        condition_item: {
            type: dataTypes.STRING
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        id_user_register: {
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName: "itemsvehicles",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const Itemlocation = sequelize.define(alias, cols, config);

    Itemlocation.associate = function (models) {
        Itemlocation.belongsTo(models.User, { 
            as: "user",
            foreignKey: "id_user_register"
        });

        Itemlocation.belongsTo(models.Vehicle, { 
            as: "vehicle",
            foreignKey: "id_vehicle"
        });

        Itemlocation.belongsTo(models.Typeitem, { 
            as: "typeitem",
            foreignKey: "id_type_item"
        });
    }
    return Itemlocation;
}