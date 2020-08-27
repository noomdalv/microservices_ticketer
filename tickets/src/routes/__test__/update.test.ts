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

it("returns 401 if the user doesnt own the ticket", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", global.signin())
		.send({
			title: "abcd",
			price: 100,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", global.signin())
		.send({
			title: "abcdefg",
			price: 200,
		})
		.expect(401);
});

it("returns 400 if the user provides an invalid title or price", async () => {
	const cookie = global.signin();

	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", cookie)
		.send({
			title: "ticketv1",
			price: 10,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "",
			price: 6,
		})
		.expect(400);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "newtitle",
			price: -8,
		})
		.expect(400);
});

it("updates the ticket provided values", async () => {
	const cookie = global.signin();

	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", cookie)
		.send({
			title: "ticket v1",
			price: 10,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "ticket v2",
			price: 20,
		})
		.expect(200);

	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send();

	expect(ticketResponse.body.title).toEqual("ticket v2");
	expect(ticketResponse.body.price).toEqual(20);
});
