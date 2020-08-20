import express from "express";
import { currentUser } from "../middlewares/current_user";
import { requireAuth } from "../middlewares/require_auth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
