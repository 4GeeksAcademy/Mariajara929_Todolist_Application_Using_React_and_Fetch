import React, { useState } from "react";


export const ToDoInput = ({ toDoList, setToDoList }) => {
    const [inputValue, setInputValue] = useState("")
    const addToDo = (e) => {
        if (e.key == "Enter" && inputValue != "") {
            let newToDoList = toDoList.concat(inputValue)
            setToDoList(newToDoList)
            setInputValue("")
            console.log(toDoList)
        }
    }
    return (
        <input className="col-6 alert alert-light" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={e => addToDo(e)} />
    )
}