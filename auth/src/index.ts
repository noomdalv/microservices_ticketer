import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current_user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error_handler";
import { NotFoundError } from "./errors/not_found_error";
import { cookie } from "express-validator";

const app = express();

app.set("trust proxy", true); // Traffic to the app is being handled through ingress nginx

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	try {
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("MongoDB connection established.");
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.log("Listening on port 3000");
	});
};

start();
