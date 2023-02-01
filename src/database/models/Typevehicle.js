module.exports = (sequelize, dataTypes) => {
    let alias = "Typevehicle";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        }    
    };
    let config = {
        tableName: "typevehicles",
        timestamps: false
    }
    const Typevehicle = sequelize.define(alias, cols, config);

    Typevehicle.associate = function (models) {
        Typevehicle.hasMany(models.Vehicle, { 
            as: "vehicles",
            foreignKey: "id_type_vehicle"
        });
    }
    return Typevehicle;
}