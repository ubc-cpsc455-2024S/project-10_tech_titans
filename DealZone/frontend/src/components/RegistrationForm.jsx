import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAsync } from "../thunks/auth";
import { clearAPIStatus } from "../slices/auth";
// import { nanoid } from '@reduxjs/toolkit'


export default function RegistrationForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const blankState = { username: "", email: "", phone: "", password: "" };
	const [formData, setFormData] = useState(blankState);
	const authState = useSelector((state) => state.auth);
	
	useEffect(() => {
		dispatch(clearAPIStatus());
	}, []);

	useEffect(() => {
		if (authState.registerUser === 'FULFILLED') {
			navigate('/login');
			dispatch(clearAPIStatus());
		}
	}, [authState.registerUser]);


	//   const dispatch = useDispatch();
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (areTextFieldsValid(formData.username, formData.password)) {
			// TODO: maybe pass in more fields, only email and pw for now.

			//   dispatch(
			//     registerUser({
			//       id: nanoid(),
			//       firstName: formData.firstName,
			// 	  lastName: formData.lastName,
			//       email: formData.email,
			// 	  phone: formData.phone,
			//       address: formData.address,
			// 	  password: formData.password
			//     })
			//   )
			// alert(`Username: ${formData.username} \nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nUsername: ${formData.username}\nPassword: ${formData.password}`); // alert for testing purpose
			dispatch(registerUserAsync({email: formData.email, password: formData.password}));
			setFormData(blankState);
		} else {
			alert("Invalid form inputs detected."); // alert for testing purpose
		}
	};

	const handleInvalidPhoneFormat = (event) => {
		event.target.setCustomValidity("Please enter a 10-11 digit phone number without spacing in between or additional punctuation.");
	}

	const handlePhoneChange = (event) => {
		handleChange(event);
		event.target.setCustomValidity(""); // reset validity message
	};

	return (
		<div className="register-container">
			<form className="register-form" onSubmit={handleSubmit}>
				<h2 id="registerHeading">Welcome to DealZone</h2>

				<label htmlFor="username">Username *</label>
				<input className="input" type="text" id="username" name="username" required value={formData.username} onChange={handleChange} />

				<label htmlFor="email">Email *</label>
				<input className="input" type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />

				<label htmlFor="phone">Phone Number</label>
				<input className="input" type="text" id="phone" name="phone" placeholder="10 - 11 digits" pattern=" *\d{10,11} *" onInvalid={handleInvalidPhoneFormat} value={formData.phone} onChange={handlePhoneChange} />

				<label htmlFor="password">Password *</label>
				<input className="input" type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
				{authState.registerUser === 'REJECTED' && <p style={{ color: 'red' }}>Registration Failed</p>}
				<button className="register-button" type="submit">Register</button>
				<label className="required-field">* Required fields</label>
				<p><Link to="/login">Login</Link> with existing account or continue as <Link to="/">Guest</Link>.</p>
				<p></p>
			</form>
		</div>
	);
}

function areTextFieldsValid(username, password) {
	return !(username.trim().length === 0|| password.trim().length === 0);
}