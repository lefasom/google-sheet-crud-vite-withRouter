import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

function Form() {

	const URL_GOOGLE_SHEET = 'https://sheet.best/api/sheets/9a59601a-da54-454f-818a-224f21e031cd'
	const [dato, setDato] = useState({
		name: "",
		email: "",
		message: "",
		date: new Date().toString(),
	});
	const navigate = useNavigate()
	
	  const handleChange = (e) =>
		setDato({ ...dato, [e.target.name]: e.target.value });
	
	const handleSubmit = async () => {
		try {
		  const res = await fetch(
			`${URL_GOOGLE_SHEET}`,
			{
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(dato),
			}
		  );

		  if (res.ok) {
			navigate('/')
	
		  }
		} catch (error) {
		  console.log(error);
		}
	}

  return (
        
	<div className="containerpro">
		
		 <div className="miName">
			
			<h4>Name </h4>
			<input
          		type="text"
          		name="name"
          		value={dato.name}
          		onChange={handleChange}
        	/>
			<h4>Email</h4>
			<input
				type="email"
				className="form-control"
				name="email"
				value={dato.email}
				onChange={handleChange}
			/>
			<h4>Message</h4>
			<textarea
				name="message"
				cols="30"
				rows="3"
				className="form-control"
				value={dato.message}
				onChange={handleChange}
        	/>
			<button 
			onClick={
				()=>{handleSubmit()}}
			>
				Registrar
			</button>
		</div> 
	</div>
  )
}

export default Form