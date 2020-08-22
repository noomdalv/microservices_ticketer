import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			setErrors(null);

			const response = await axios[method](url, body);

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;
		} catch (err) {
			setErrors(
				<div className="alert alert-danger">
					<h5>Oops...</h5>
					<ul className="my-0">
						{err.response.data.errors.map((err) => {
							return <li key={err.message}>{err.message}</li>;
						})}
					</ul>
				</div>
			);
		}
	};
	return { doRequest, errors };
};

export default useRequest;
