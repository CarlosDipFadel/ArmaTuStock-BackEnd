import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import conectDB from "./src/database/db"

const app = express();

app.set('port', process.env.PORT || 5050);

const initApp = async () => {
    try {
        await conectDB()
        app.listen(app.get("port"), () => {
            console.log(`Backen prueba listening to PORT: ${app.get("port")}`);
        }).on("error", (error) => {
            console.log("ERROR:", error);
            process.exit(1);
        });
    } catch (error) {
        console.log("ERROR:", error);
        process.exit(1);
    }
};

initApp();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev")); 
app.use(cors());

app.use("/api", require("./src/routes/Routes"));
app.use("/api/products", require("./src/routes/products.route"));