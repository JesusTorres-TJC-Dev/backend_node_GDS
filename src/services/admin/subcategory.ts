import { SubCategoryAttributes } from "../../interfaces/category.interface";
import db from "../../models"
import { findAllParse } from "../../utils/findAllParse.handle";
const SubCategory = db.SubCategory

const createSubCategory = async (subcategory: SubCategoryAttributes) => {
    const {
        category_id,
        subcategory_name,
        subcategory_slug,
        subcategory_description,
        subcategory_icon,
    } = subcategory

    const subcategoryFind = await SubCategory.findOne({ where: { subcategory_name: subcategory_name } });
    
    if(subcategoryFind != null) return "SUBCATEGORY_ALLREADY_EXIST";

    const subCategoryResponse = await SubCategory.create({
        category_id,
        subcategory_name,
        subcategory_slug,
        subcategory_description,
        subcategory_icon
    })

    return subCategoryResponse;

    // return categoryResponse.dataValues.category_id;
}

const getAllSubCategories = async () => {
    let subcategories = await SubCategory.findAll();

    subcategories = findAllParse(subcategories)
    const cantSubCategories = subcategories.length

    if(cantSubCategories <= 0) return "SUBCATEGORIES_EMPTY"

    return subcategories
}

const getSubCategoryById = async (subcategory_id: number) => {
    const subcategory = await SubCategory.findByPk(subcategory_id);

    if(subcategory === null) return "SUBCATEGORY_NOT_EXIST"
    
    return subcategory;
}

const editSubCategoryById = async (subcategory_id: number, subcategory: SubCategoryAttributes) => {
    const {
        category_id,
        subcategory_name,
        subcategory_slug,
        subcategory_description,
        subcategory_icon,
    } = subcategory

    const subcategoryFind = await SubCategory.findByPk(subcategory_id)
    
    if(subcategoryFind == null) return "SUBCATEGORY_NOT_EXIST"
    
    const subcategoryResponse = await SubCategory.update({
        category_id,
        subcategory_name,
        subcategory_slug,
        subcategory_description,
        subcategory_icon,
    },
    {
        where: {
            subcategory_id: subcategory_id
        }
    })

    if(subcategoryResponse != 1) return "ERROR_WITH_EDIT_SUBCATEGORY"

    const subcategoryFindEdit = await SubCategory.findByPk(subcategory_id)
    
    return subcategoryFindEdit;
}

const editStatusSubCategoryById = async (subcategory_id:number) => {
    const subcategory = await SubCategory.findByPk(subcategory_id)

    if(subcategory === null) return "SUBCATEGORY_NOT_EXIST"

    const status = !subcategory.subcategory_status

    const subcategoryResponse = await SubCategory.update(
        {
            subcategory_status: status
        },
        {
            where: {
                subcategory_id: subcategory_id
            }
        }
    )
    
    if(subcategoryResponse != 1) return "ERROR_WITH_EDIT_STATUS_SUBCATEGORY"
    
    return status ? "true" : "false";
}

const editStatusSubCateogryByCategoryId = async (category_id: number, status: boolean) => {

    await SubCategory.update(
        {
            subcategory_status: status
        },
        {
            where: {
                category_id: category_id
            }
        }
    )
}

const deleteSubCategoryById = async (subcategory_id: number) => {
    const subcategory = await SubCategory.findByPk(subcategory_id)
    
    if(subcategory === null) return "SUBCATEGORY_NOT_EXIST"
    
    const subcategoryResponse = await SubCategory.destroy({
        where: {
            subcategory_id: subcategory_id
        }
    })
    
    if(subcategoryResponse != 1) return "ERROR_WITH_DELETE_SUBCATEGORY"

    return "SUBCATEGORY_DELETE_SUCCESSFULL"
}

const deleteSubCategoryByCategoryId = async (category_id: number) => {
    await SubCategory.destroy({
        where: {
            category_id: category_id
        }
    })
}

export {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    editSubCategoryById,
    editStatusSubCategoryById,
    deleteSubCategoryById,
    editStatusSubCateogryByCategoryId, //call in Category.ts
    deleteSubCategoryByCategoryId, //call in Category.ts
}