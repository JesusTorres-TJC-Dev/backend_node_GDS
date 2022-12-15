import { Request, response, Response } from "express";
import { createCategory, deleteCategoryById, editCategoryById, editStatusCateogryById, getAllCategories, getCategoryById } from "../../services/admin/category";
import { handleHttp } from "../../utils/error.handle";

const createCategoryCtrl = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const response = await createCategory(body)

        if(response === "CATEGORY_ALLREADY_EXIST") return handleHttp(res, response, "error")

        return res.status(200).json({
            success: true,
            message: "CATEGORY_CREATE_SUCCESS",
            category: response
        })

    } catch (error) {
        handleHttp(res, 'ERROR_CREATE_CATEGORY', error)
    }
}

const getAllCategoriesCtrl = async (req: Request, res: Response) => {
    try {
        const response = await getAllCategories()

        if(response === "CATEGORIES_EMPTY") return handleHttp(res, response, "error")

        return res.status(200).json({
            success: true,
            message: "CATEGORIES_SUCCESS",
            categories: response
        })

    } catch (error) {
        handleHttp(res, 'ERROR_GET_CATEGORIES', error)
    }
}

const getCategoryByIdCtrl = async (req: Request, res: Response) => {
    try {
        const { category_id } = req.params
        
        const response = await getCategoryById(parseInt(category_id))

        if(response === "CATEGORY_NOT_EXIST") return handleHttp(res, response, "error")

        return res.status(200).json({
            success: true,
            message: "CATEGORY_GET_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_GET_CATEGORY', error)
    }
}

const editCategoryByIdCtrl = async (req: Request, res: Response) => {
    const errors = [
        "ERROR_WITH_EDIT_CATEGORY",
        "CATEGORY_NOT_EXIST"
    ]
    try {
        const { category_id } = req.params
        const { body } = req
        
        const response = await editCategoryById(parseInt(category_id), body)

        if(errors.includes(response)) return handleHttp(res, response, "error")
        
        return res.status(200).json({
            success: true,
            message: "CATEGORY_EDIT_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_EDIT_CATEGORY', error)
    }
}

const editStatusCateogryByIdCtrl = async (req: Request, res: Response) => {
    const errors = [
        "ERROR_WITH_EDIT_STATUS_CATEGORY",
        "CATEGORY_NOT_EXIST"
    ]
    try {
        const { category_id } = req.params

        const response = await editStatusCateogryById(parseInt(category_id))

        if(errors.includes(response)) return handleHttp(res, response,"error")

        return res.status(200).json({
            success: true,
            message: "CATEGORY_EDIT_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_EDIT_CATEGORY', error)
    }
}

const deleteCategoryByIdCtrl = async (req: Request, res: Response) => {
    const errors = [
        "CATEGORY_NOT_EXIST",
        "ERROR_WITH_DELETE_CATEGORY"
    ]
    try {
        const { category_id } = req.params

        const response = await deleteCategoryById(parseInt(category_id))
        
        if(errors.includes(response)) return handleHttp(res, response,"error")
        
        return res.status(200).json({
            success: true,
            message: "CATEGORY_DELETE_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_CATEGORY', error)
    }
}

export {
    createCategoryCtrl,
    getAllCategoriesCtrl,
    getCategoryByIdCtrl,
    editCategoryByIdCtrl,
    editStatusCateogryByIdCtrl,
    deleteCategoryByIdCtrl
}