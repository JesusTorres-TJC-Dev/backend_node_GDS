'use strict';
const { v4: uuidv4 } = require('uuid');
const { hash } = require('bcryptjs');

//import { encrypt } from '../utils/bcryptHandle'
//const { encrypt } = require('../utils/bcryptHandle');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        userName: 'John Admin',
        email: 'exampleAdmin@example.com',
        role: "Admin",
        password: await hash('123456789', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userName: 'John Teacher',
        email: 'exampleTeacher@example.com',
        role: "Teacher",
        password: await hash('123456789', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userName: 'John Student',
        email: 'exampleStudent@example.com',
        role: "Student",
        password: await hash('123456789', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
