import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  // use array destructuring to bring data (array of objects) and function _setTasks_ to update and modify data
  //   const [tasks, setTasks] = useState([
  //     { title: "Make a dinner", id: "fk" },
  //     { title: "Learn Data Structure", id: "dk" },
  //     { title: "Read a book", id: "ls" },
  //   ]);
  //to add data to local storage use useEffect Hook
  // define initial value of the state, where to store an array from local storage
  // parse data, that is stored as a JSON
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [editElem, setEditElem] = useState(null);

  const addTask = (title) => {
    setTasks([...tasks, { title, id: uuidv4() }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const findTask = (id) => {
    const elem = tasks.find((task) => task.id === id);
    setEditElem(elem);
  };

  const editTask = (title, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, id } : task
    );
    setTasks(newTasks);
    // clear input field after editing
    setEditElem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        clearAll,
        findTask,
        editElem,
        editTask,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
