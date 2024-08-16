import { useEffect, useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";

//to get data from localstorage

const getLocalTasks = () => {
  let task = localStorage.getItem("tasks");
  if (task) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
};

const ToDoList = () => {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState(getLocalTasks());

  useEffect(() => {
    // Save tasks to localStorage whenever tasks are updated
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTaskHandler = () => {
    if (todo.trim() !== "") {
      setTasks([...tasks, todo]);
      setTodo("");
    }
  };

  const deleteHandler = (index) => {
    const delTask = tasks.filter((_, i) => i !== index);
    setTasks(delTask);
  };

  return (
    <div className="container">
      <div className="inputDiv">
        <h1>To do list</h1>
        <input
          type="text"
          value={todo}
          placeholder="Write your Task"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button onClick={addTaskHandler}>Add Task</button>
      </div>
      <div className="listDiv">
        <ol>
          {tasks.map((task, index) => {
            return (
              <>
                <li key={index}>
                  <span>{task}</span>
                  <FcEmptyTrash onClick={() => deleteHandler(index)} />
                </li>
              </>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ToDoList;
