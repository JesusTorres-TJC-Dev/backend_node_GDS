import db from "../../models"
import { findAllParse } from "../../utils/findAllParse.handle";
const Category = db.Category
const SubCategory = db.SubCategory

const getAllCategoriesPublic = async () => {
    let categories = await Category.findAll({
        include : {
            model :  SubCategory,
            attributes : ["subcategory_id", "subcategory_name", "subcategory_slug", "subcategory_icon"],
            where: {subcategory_status: true}
        },
        //order : "category_name",
        attributes: ["category_id", "category_name", "category_icon", "category_slug"],
        // limit: 5,
        // offset: 0,
        where: {category_status: true}
    });

    categories = findAllParse(categories)
    const cantCategories = categories.length
    //console.log(categories)
    if(cantCategories <= 0) return "CATEGORIES_EMPTY"

    return categories
}

export { getAllCategoriesPublic }