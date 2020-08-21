import request from "supertest";

import { app } from "../../app";

it("fails when an email that does not exit is supplied", async () => {
	request(app)
		.post("/api/users/signin")
		.send({
			email: "abc@abc.com",
			password: "1234",
		})
		.expect(400);
});

it("fails when an incorrect password  is supplied", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "abc@abc.com",
			password: "1234",
		})
		.expect(201);

	const response = await request(app)
		.post("/api/users/signin")
		.send({
			email: "abc@abc.com",
			password: "xyz",
		})
		.expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({
			email: "abc@abc.com",
			password: "1234",
		})
		.expect(201);

	const response = await request(app)
		.post("/api/users/signin")
		.send({
			email: "abc@abc.com",
			password: "1234",
		})
		.expect(200);

	expect(response.get("Set-Cookie")).toBeDefined();
});
