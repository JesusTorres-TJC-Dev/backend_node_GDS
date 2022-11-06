import db from "../models"
const User = db.User

const getAllUsers = async () => {
    const getUsers = await User.findAll()
    return getUsers
}

export {
    getAllUsers,
}