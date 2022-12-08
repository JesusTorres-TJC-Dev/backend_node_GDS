'use strict';
import {
  Model, UUIDV4
} from 'sequelize';
import { CategoryAttributes } from '../interfaces/category.interface';
module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model<CategoryAttributes>
  implements CategoryAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     category_id!: number;
     category_name!: string;
     category_description!: string;
     category_icon!: string;
     category_status!: boolean;
    static associate(models: any) {
      Category.hasMany(models.SubCategory, { foreignKey : "category_id"})
    }
  }
  Category.init({
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};