const Sequelize = require('sequelize');
const db = require('../config/db');

const user_follower = db.define('users_followers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    followerId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
            model : 'users',
            key : 'id'
        }
    },
    followingId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
            model : 'users',
            key : 'id'
        }
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = user_follower;