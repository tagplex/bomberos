module.exports = (sequelize, dataTypes) => {
    let alias = "Role";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        role: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "roles",
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models) {
        Role.hasMany(models.User, {
            as: "users", 
            foreignKey: "id_rol"
        })
    }

    return Role;
}