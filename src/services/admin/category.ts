import { CategoryAttributes } from "../../interfaces/category.interface";
import db from "../../models"
import { findAllParse } from "../../utils/findAllParse.handle";
import { deleteSubCategoryByCategoryId, editStatusSubCateogryByCategoryId } from "./subcategory";
const Category = db.Category
const SubCategory = db.SubCategory

const createCategory = async (category: CategoryAttributes) => {
    const {
        category_name,
        category_slug,
        category_description,
        category_icon
    } = category

    const categoryFind = await Category.findOne({ where: { category_name: category_name } });
    
    if(categoryFind != null) return "CATEGORY_ALLREADY_EXIST";

    const categoryResponse = await Category.create({
        category_name,
        category_slug,
        category_description,
        category_icon
    })

    return categoryResponse;

    // return categoryResponse.dataValues.category_id;
}

const getAllCategories = async () => {
    let categories = await Category.findAll({
        include : {
            model :  SubCategory,
            //attributes : ["nombre_carrera","tipo"]
        },
        //order : "category_name"
    });

    categories = findAllParse(categories)
    const cantCategories = categories.length

    if(cantCategories <= 0) return "CATEGORIES_EMPTY"

    return categories
}

const getCategoryById = async (category_id: number) => {
    const category = await Category.findOne({
        where: {
            category_id: category_id
        },
        include : {
            model :  SubCategory,
            //attributes : ["nombre_carrera","tipo"]
        },
        //order : "category_name"
    });

    if(category === null) return "CATEGORY_NOT_EXIST"
    
    return category
}

const editCategoryById = async (category_id: number, category: CategoryAttributes) => {
    const {
        category_name,
        category_description,
        category_icon,
        category_status
    } = category

    const categoryFind = await Category.findByPk(category_id)
    
    if(categoryFind == null) return "CATEGORY_NOT_EXIST"
    
    const categoryResponse = await Category.update({
        category_name,
        category_description,
        category_icon
    },
    {
        where: {
            category_id: category_id
        }
    })

    if(categoryResponse != 1) return "ERROR_WITH_EDIT_CATEGORY"

    const categoryFindEdit = await Category.findByPk(category_id)
    
    return categoryFindEdit;
}

const editStatusCateogryById = async (category_id: number) => {
    const category = await Category.findByPk(category_id)

    if(category === null) return "CATEGORY_NOT_EXIST"

    const status = !category.category_status

    const categoryResponse = await Category.update({
        category_status: status
    },
    {
        where: {
            category_id: category_id
        }
    })
    
    if(categoryResponse != 1) return "ERROR_WITH_EDIT_STATUS_CATEGORY"

    await editStatusSubCateogryByCategoryId(category_id, status)
    
    // cursos
    
    return status ? "true" : "false";
}

const deleteCategoryById = async (category_id: number) => {
    const category = await Category.findByPk(category_id)
    
    if(category === null) return "CATEGORY_NOT_EXIST"
    
    const categoryResponse = await Category.destroy({
        where: {
            category_id: category_id
        }
    })
    
    if(categoryResponse != 1) return "ERROR_WITH_DELETE_CATEGORY"

    await deleteSubCategoryByCategoryId(category_id)

    return "CATEGORY_DELETE_WITH_ALL_CONTENT_SUCCESSFULL"
}

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    editCategoryById,
    deleteCategoryById,
    editStatusCateogryById
}