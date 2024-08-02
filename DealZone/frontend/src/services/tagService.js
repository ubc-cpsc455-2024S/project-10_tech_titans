import SERVER_URL from '../../config';
const getTags = async () => {
	const response = await fetch(SERVER_URL + '/tags', {
		method: 'GET',
		credentials: 'include'
	});
	return response.json();
};

const addTag = async (tags) => {
	console.log("tags in frontend service: ", tags);
	const response = await fetch(SERVER_URL + '/tags', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(tags),
		credentials: 'include'
	});
	const data = await response.json();
	console.log("res in service: ", data);
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg)
	}
	return data;
};


export default {
	getTags,
	addTag
};