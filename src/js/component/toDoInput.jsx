import React, { useState } from "react";


export const ToDoInput = ({ toDoList, setToDoList, addToDo }) => {
    const [inputValue, setInputValue] = useState("")
    const submitToDo = (e) => {
        if (e.key == "Enter" && inputValue != "") {
            addToDo({
                "label": inputValue,
                "is_done": false,
            })
            setInputValue("")
            console.log(toDoList)
        }
    }
    return (
        <input className="col-6 alert alert-light" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={e => submitToDo(e)} />
    )
}