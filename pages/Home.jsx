import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

function Home() {
    const [data, setData] = useState();
	const URL_GOOGLE_SHEET = 'https://sheet.best/api/sheets/9a59601a-da54-454f-818a-224f21e031cd'
	const getData = async () => {
		try {
		  const res = await fetch(
			`${URL_GOOGLE_SHEET}?_format=index`
		  );
		  const data = await res.json();
		  setData(Object.keys(data).map((key) => data[key]));
		} catch (error) {
		  console.log(error);
		}
	  };
	
	  useEffect(() => {
		  getData();
	  },[]);
	
	
	const handleDelete = async (rowIndex) => {
		try {
		  	const res = await fetch(
				`${URL_GOOGLE_SHEET}/${rowIndex}`,
				{
				method: "DELETE",
				}
			);
			if (res.ok) {
				const updatedData = data.filter((_, i) => i !== rowIndex);
				setData(updatedData);
			}
		} catch (error) {
		  console.log(error);
		}
	};



  return (
    <div>
        <Link to="/Form">New</Link>
		<div className="nombre">
        	<h2>Registrados</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Message</th>
						<th>Accion</th>

					</tr>
				</thead>
				
				{data?.map((val, i)=>{
					return(
				<tbody key={i}>			
					<tr>
						<td>
							<p>{val.date}</p>
						</td>
						<td>
							<p>{val.name}</p>
						</td>
						<td>
							<p>{val.email}</p>
						</td>
						<td>
							<p>{val.message}</p>
						</td>
						<td>
							<button onClick={()=>handleDelete(i)}>X</button>
						</td>
					</tr>
				</tbody>			
							
					)
				})}
			</table>
        </div>
    </div>

  )
}

export default Home