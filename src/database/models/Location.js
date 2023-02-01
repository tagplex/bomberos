module.exports = (sequelize, dataTypes) => {
    let alias = "Location";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: dataTypes.STRING,
            allowNull: false,
        }      
    };
    let config = {
        tableName: "locations",
        timestamps: false
    }
    const Location = sequelize.define(alias, cols, config);

    Location.associate = function (models) {
        Location.hasMany(models.Vehicle, {
            as: "vehicle", 
            foreignKey: "id_location"
        })
    }
    return Location;
}