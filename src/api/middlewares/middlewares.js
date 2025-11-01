import cors from "cors";

export default function middlewares(app) {
    app.use(cors());
}