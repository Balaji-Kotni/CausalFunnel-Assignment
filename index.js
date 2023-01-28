import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import blogRoutes from "./routes/blogs.js";
import authRoutes from "./routes/auth.js";

//swaggerUI
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./documentation/swagger.json";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));

//swagger UI Config
swaggerDoc.components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};
swaggerDoc.security = [
  {
    bearerAuth: [],
  },
];
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api", blogRoutes);

/* MONGOOSE */
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "BLOG",
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
