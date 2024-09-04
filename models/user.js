import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mustChangePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },  
    } , {
        timestamps: false,
        tableName: 'users',
})