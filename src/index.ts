import "dotenv/config"
import express from "express";
import cors from "cors"
import { router } from "./routes";
import db from "./models"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
    origin: ['*']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

const conection = async () => {
    try {
        await db.sequelize.sync({ force: false });
        app.listen(PORT);
        console.log('listening: ', PORT);
    } catch (error) {
        console.error(error);
    }
}

conection()