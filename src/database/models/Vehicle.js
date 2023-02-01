module.exports = (sequelize, dataTypes) => {
    let alias = "Vehicle";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_type_vehicle: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: dataTypes.STRING,
        },
        model: {
            type: dataTypes.STRING,
        },
        year: {
            type: dataTypes.STRING,
        },
        PPU: {
            type: dataTypes.STRING,
        },
        id_location: {
            type: dataTypes.STRING,
        }     
    };
    let config = {
        tableName: "vehicles",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const Vehicle = sequelize.define(alias, cols, config);

    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.Typevehicle, { 
            as: "typevehicle",
            foreignKey: "id_type_vehicle"
        });

        Vehicle.belongsTo(models.Location, { 
            as: "location",
            foreignKey: "id_location"
        });

        Vehicle.hasMany(models.Itemsvehicle, { 
            as: "vehicles",
            foreignKey: "id_vehicle"
        });
    }
    return Vehicle;
}