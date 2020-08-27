import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}

jest.setTimeout(30000);
let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = "asdfasdf";

	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(
		mongoUri,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) console.error(err);
		}
	);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = () => {
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: "my@email.com",
	};

	const token = jwt.sign(payload, process.env.JWT_KEY!);

	const session = { jwt: token };

	const sessionJSON = JSON.stringify(session);

	const base64 = Buffer.from(sessionJSON).toString("base64");

	// supertest expects an array as cookie
	return [`express:sess=${base64}`];
};
