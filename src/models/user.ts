'use strict';
import {
  Model, UUIDV4
} from 'sequelize';
import Roles from '../config/Roles';

import { UserAttributes } from '../interfaces/User.interface';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    user_id!: number;
    user_email!: string;
    user_password!: string;
    user_role!: Roles;
    user_name!: string;
    user_last_name!: string;
    user_slug!: string;
    user_phone!: string;
    user_country!: string;
    user_image!: string;
    user_verify!: boolean;
    static associate(models: any) {
      // define association here
    }
  }
  User.init({
    // id: {
    //   type: DataTypes.UUID.UNSIGNED,
    //   defaultValue: UUIDV4,
    //   allowNull: false,
    //   primaryKey: true
    // },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey : true,
      autoIncrement : true
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING,
      defaultValue: Roles.STUDENT
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://toppng.com/public/uploads/preview/avatar-windows-10-person-ico-115628997732fatjfxg5s.png'
    },
    user_verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};