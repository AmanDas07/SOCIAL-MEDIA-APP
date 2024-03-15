import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("<h1>Welcome to SM APP</h1>");
})
const routesDirectory = './routes';

fs.readdirSync(routesDirectory)
    .map(fileName => {
        const routePath = path.join(routesDirectory, fileName);
        // Importing the route using dynamic import
        import('./' + routePath)
            .then(module => app.use('/api', module.default || module));
    });
//readdirSync("./routes").map(r => app.use('/api', import(`./routes/{$r}`)))


const connection = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log(err);
    })
}


connection();
const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${PORT}`);
});
