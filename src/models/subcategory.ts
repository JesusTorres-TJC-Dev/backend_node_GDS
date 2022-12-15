'use strict';
import {
  Model
} from 'sequelize';
import { SubCategoryAttributes } from '../interfaces/category.interface';
module.exports = (sequelize: any, DataTypes: any) => {
  class SubCategory extends Model<SubCategoryAttributes>
  implements SubCategoryAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    subcategory_id!: number;
    category_id!: number;
    subcategory_name!: string;
    subcategory_slug!: string;
    subcategory_description!: string;
    subcategory_icon!: string;
    subcategory_status!: boolean;
    static associate(models: any) {
      SubCategory.belongsTo(models.Category, {foreignKey: "category_id"})
    }
  }
  SubCategory.init({
    subcategory_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    subcategory_slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    subcategory_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategory_icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategory_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};