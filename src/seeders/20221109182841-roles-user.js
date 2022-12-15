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
        user_email: 'exampleAdmin@example.com',
        user_password: await hash('123456789', 8),
        user_role: "ADMIN",
        user_name: 'John',
        user_last_name: 'Admin',
        user_slug: 'John-Admin',
        user_phone: '+58 4147407577',
        user_country: 'VE',
        user_image: 'https://toppng.com/public/uploads/preview/avatar-windows-10-person-ico-115628997732fatjfxg5s.png',
        user_verify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // {
      //   id: uuidv4(),
      //   userName: 'John Teacher',
      //   email: 'exampleTeacher@example.com',
      //   role: "Teacher",
      //   verify: false,
      //   code: uuidv4(),
      //   password: await hash('123456789', 8),
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   id: uuidv4(),
      //   userName: 'John Student',
      //   email: 'exampleStudent@example.com',
      //   role: "Student",
      //   verify: false,
      //   code: uuidv4(),
      //   password: await hash('123456789', 8),
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
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
