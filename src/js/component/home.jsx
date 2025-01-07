import React, { useEffect, useState } from "react";
import { ToDoInput } from "./toDoInput";

const Home = () => {
	const [toDoList, setToDoList] = useState([])


	const deleteToDo = async (todoId) => {
		let response = await fetch('https://playground.4geeks.com/todo/todos/' + todoId, {
			method: "DELETE",

		})
		if (response.status == 204) {
			getToDoList()
		}
		else {
			console.log("error:", response.status, response.statusText)
		}


	}
	const addToDo = async (todo) => {
		let response = await fetch('https://playground.4geeks.com/todo/todos/mariajara929', {
			method: "POST",
			body: JSON.stringify(todo),
			headers: {
				"Content-Type": "application/json"
			}
		})
		if (response.status == 201) {
			let data = await response.json()
			console.log(data)
			getToDoList()
		}
		else {
			console.log("error:", response.status, response.statusText)
		}


	}
	function createUser() {
		fetch('https://playground.4geeks.com/todo/users/mariajara929', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Will be true if the response is successful
				console.log(resp.status); // The status code=200 or code=400 etc.
				console.log(resp.text()); // Will try to return the exact result as a string
				return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
			})
			.then(data => {
				// Here is where your code should start after the fetch finishes
				console.log(data); // This will print on the console the exact object received from the server
			})
			.catch(error => {
				// Error handling
				console.error(error);
			});
	}
	const getToDoList = async () => {

		let response = await fetch('https://playground.4geeks.com/todo/users/mariajara929', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (response.status == 404) {
			createUser()
		} else if (response.status == 200) {
			let data = await response.json()
			setToDoList(data.todos)
		} else {
			alert("There seems to be an issue retrieving your todos at the moment, please try again later...")
		}

	}
	useEffect(() => {
		getToDoList()
	}, [])
	return (
		<div className="container d-flex flex-column justify-content-center align-items-center">
			<h1 className="alert text-secondary">To Do's</h1>
			<ToDoInput toDoList={toDoList} setToDoList={setToDoList} addToDo={addToDo} />
			{toDoList.map((value, index) => <div className="alert alert-dark col-6 d-flex justify-content-between">
				<p>	{value.label} </p>
				<span onClick={() => deleteToDo(value.id)} className="deleteButton btn btn-secondary"> X </span>
			</div>)}
		</div>
	);
};

export default Home;
