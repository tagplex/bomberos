module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING
        },
        id_rol: {
            type: dataTypes.INTEGER
        },
        state: {
            type: dataTypes.INTEGER
        }
        
    };
    let config = {
        tableName: "users",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Role, { 
            as: "role",
            foreignKey: "id_rol"
        });

        User.hasMany(models.Itemsvehicle, { 
            as: "user",
            foreignKey: "id_user_register"
        })

    }
    return User;
}