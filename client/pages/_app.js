import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build_client";

const AppComponent = ({ Component, pageProps }) => {
	return (
		<div>
			<h1>Header</h1>
			<Component {...pageProps} />
		</div>
	);
};

export default AppComponent;
