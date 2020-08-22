import axios from "axios";

const LandingPage = ({ currentUser }) => {
	console.log("currentuser = ", currentUser);
	return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
	if (typeof window === "undefined") {
		// no browser window object defined(we are at the server side)
		// requests should be made to "http://SERVICENAME.NAMESclsPACE.svc.cluster.local"
		const { data } = await axios.get(
			"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
			{
				headers: req.headers,
			}
		);
		return data;
	} else {
		// request is made from the browser(not server)
		const { data } = await axios.get("/api/users/currentuser");
		return data;
	}

	return {};
};

export default LandingPage;
