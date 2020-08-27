import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import Mongoose from "mongoose";

it("returns 404 if the provided ID doesnt exist", async () => {
	const id = new Mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.set("Cookie", global.signin())
		.send({
			title: "updated",
			price: 30,
		})
		.expect(404);
});

it("returns 401 if user is not authenticated", async () => {
	const id = new Mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: "updated",
			price: 30,
		})
		.expect(401);
});

it("returns 401 if the user doesnt own the ticket", async () => {});

it("returns 400 if the user provides an invalid title or price", async () => {});

it("updates the ticket provided values", async () => {});
