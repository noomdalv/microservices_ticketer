import buildClient from "../api/build_client";

const LandingPage = ({ currentUser }) => {
	console.log("currentuser = ", currentUser);
	return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);
	const { data } = await client.get("/api/users/currentuser");

	return data;
};

export default LandingPage;
