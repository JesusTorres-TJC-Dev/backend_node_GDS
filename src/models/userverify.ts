'use strict';
import {
  Model
} from 'sequelize';
import { UserEmailVerifyAttributes } from '../interfaces/auth.interface';

module.exports = (sequelize: any, DataTypes: any) => {
  class UserVerify extends Model<UserEmailVerifyAttributes>
  implements UserEmailVerifyAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    code_id!: number;
    user_email!: string;
    user_code!: string;
    user_code_verify!: boolean;
    static associate(models: any) {
      // define association here
    }
  }
  UserVerify.init({
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: UUIDV4,
    //   allowNull: false,
    //   primaryKey: true
    // },
    code_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey : true,
      autoIncrement : true
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    user_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_code_verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserVerify',
  });
  return UserVerify;
};