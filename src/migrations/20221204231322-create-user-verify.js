'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserVerifies', {
      code_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
      },
      user_email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      user_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_code_verify: {
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
    await queryInterface.dropTable('UserVerifies');
  }
};