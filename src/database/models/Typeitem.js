module.exports = (sequelize, dataTypes) => {
    let alias = "Typeitem";
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
        tableName: "typeitems",
        timestamps: false
    }
    const Typeitem = sequelize.define(alias, cols, config);

    Typeitem.associate = function (models) {
        Typeitem.hasMany(models.Itemsvehicle, { 
            as: "itemsvehicle",
            foreignKey: "id_type_item"
        });
    }
    return Typeitem;
}