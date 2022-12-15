'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
      },
      user_email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      user_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_role: {
        type: Sequelize.STRING
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_verify: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};