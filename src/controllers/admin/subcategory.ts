import { Request, Response } from "express";
import { createSubCategory, deleteSubCategoryById, editStatusSubCategoryById, editSubCategoryById, getAllSubCategories, getSubCategoryById } from "../../services/admin/subcategory";
import { handleHttp } from "../../utils/error.handle";

const createSubCategoryCtrl = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const response = await createSubCategory(body)

        if(response === "SUBCATEGORY_ALLREADY_EXIST") return handleHttp(res, response, "error")

        return res.status(200).json({
            success: true,
            message: "SUBCATEGORY_CREATE_SUCCESS",
            category: response
        })

    } catch (error) {
        handleHttp(res, 'ERROR_CREATE_SUBCATEGORY', error)
    }
}

const getAllSubCategoryCtrl = async (req: Request, res: Response) => {
    try {
        const response = await getAllSubCategories()

        if(response === "SUBCATEGORIES_EMPTY") return handleHttp(res, response, "error")

        return res.status(200).json({
            success: true,
            message: "SUBCATEGORIES_SUCCESS",
            categories: response
        })

    } catch (error) {
        handleHttp(res, 'ERROR_GET_SUBCATEGORIES', error)
    }
}

const getSubCategoryByIdCtrl = async (req: Request, res: Response) => {
    try {
        const { subcategory_id } = req.params
        
        const response = await getSubCategoryById(parseInt(subcategory_id))

        if(response === "SUBCATEGORY_NOT_EXIST") return handleHttp(res, response, "error")

        return res.status(200).json({
            success: true,
            message: "SUBCATEGORY_GET_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_GET_SUBCATEGORY', error)
    }
}

const editSubCategoryByIdCtrl = async (req: Request, res: Response) => {
    const errors = [
        "ERROR_WITH_EDIT_SUBCATEGORY",
        "SUBCATEGORY_NOT_EXIST"
    ]
    try {
        const { subcategory_id } = req.params
        const { body } = req
        
        const response = await editSubCategoryById(parseInt(subcategory_id), body)

        if(errors.includes(response)) return handleHttp(res, response, "error")
        
        return res.status(200).json({
            success: true,
            message: "SUBCATEGORY_EDIT_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_EDIT_SUBCATEGORY', error)
    }
}

const editStatusSubCategoryByIdCtrl = async (req: Request, res: Response) => {
    const errors = [
        "ERROR_WITH_EDIT_STATUS_SUBCATEGORY",
        "SUBCATEGORY_NOT_EXIST"
    ]
    try {
        const { subcategory_id } = req.params

        const response = await editStatusSubCategoryById(parseInt(subcategory_id))

        if(errors.includes(response)) return handleHttp(res, response,"error")

        return res.status(200).json({
            success: true,
            message: "SUBCATEGORY_EDIT_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_EDIT_SUBCATEGORY', error)
    }
}

const deleteSubCategoryByIdCtrl = async (req: Request, res: Response) => {
    const errors = [
        "SUBCATEGORY_NOT_EXIST",
        "ERROR_WITH_DELETE_SUBCATEGORY"
    ]

    try {
        const { category_id } = req.params

        const response = await deleteSubCategoryById(parseInt(category_id))
        
        if(errors.includes(response)) return handleHttp(res, response, "error")
        
        return res.status(200).json({
            success: true,
            message: "SUBCATEGORY_DELETE_SUCCESS",
            category: response
        })
    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_SUBCATEGORY', error)
    }
}

export {
    createSubCategoryCtrl,
    getAllSubCategoryCtrl,
    getSubCategoryByIdCtrl,
    editSubCategoryByIdCtrl,
    editStatusSubCategoryByIdCtrl,
    deleteSubCategoryByIdCtrl,
}