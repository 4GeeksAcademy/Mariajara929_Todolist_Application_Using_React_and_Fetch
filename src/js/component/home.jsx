import React, { useEffect, useState } from "react";
import { ToDoInput } from "./toDoInput";

const Home = () => {
	const [toDoList, setToDoList] = useState([])
	function deleteToDo(indexToBeDeleted) {
		setToDoList((currentToDoList) => {
			const newToDoList = currentToDoList.filter((_, index) => index != indexToBeDeleted)
			return newToDoList
		})
	}
	function addToDo(todo) {
		fetch('https://playground.4geeks.com/todo/todos/mariajara929', {
			method: "POST",
			body: JSON.stringify(todo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Will be true if the response is successful
				if (!resp.ok) { throw new Error() }
				console.log(resp.status); // The status code=200 or code=400 etc.
				console.log(resp.text()); // Will try to return the exact result as a string
				return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
			})
			.then(data => {
				// Here is where your code should start after the fetch finishes
				console.log(data); // This will print on the console the exact object received from the server
				getToDoList()
			})
			.catch(error => {
				// Error handling
				console.error(error);
			});
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
	function getToDoList() {
		fetch('https://playground.4geeks.com/todo/users/mariajara929', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Will be true if the response is successful
				if (!resp.ok) {
					createUser()
				}
				console.log(resp.status); // The status code=200 or code=400 etc.
				return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
			})
			.then(data => {
				// Here is where your code should start after the fetch finishes
				console.log(data); // This will print on the console the exact object received from the server
				setToDoList(data.todos)
			})
			.catch(error => {
				// Error handling
				console.error(error);
			});
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
				<span onClick={() => deleteToDo(index)} className="deleteButton btn btn-secondary"> X </span>
			</div>)}
		</div>
	);
};

export default Home;
