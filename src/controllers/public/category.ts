import { Request, Response } from "express"
import { getAllCategoriesPublic } from "../../services/public/category"
import { handleHttp } from "../../utils/error.handle"

const getAllCategoriesPublicCtrl = async (req: Request, res: Response) => {
    try {
        const getAllCategories = await getAllCategoriesPublic()

        if(getAllCategories === "CATEGORIES_EMPTY") return handleHttp(res, getAllCategories, "error")

        return res.status(200).json({
            success: true,
            message: "GET_CATEGORIES_SUCCESS",
            category: getAllCategories
        })
    } catch (error) {
        handleHttp(res, 'ERROR_GET_CATEGORIES', error)
    }
}

export { getAllCategoriesPublicCtrl }