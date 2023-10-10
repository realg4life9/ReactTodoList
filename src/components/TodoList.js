import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card.js'

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    let arr = localStorage.getItem("taskList")
    
    if(arr){
      let obj = JSON.parse(arr)
      setTaskList(obj)
    }
  }, [])


  const deleteTask = (index) => {
    // Create a copy of the taskList array to avoid mutating the state directly.
    let tempList = [...taskList];
    
    // Remove the item at the specified index from the copy.
    tempList.splice(index, 1);
    
    // Update the state with the modified array.
    setTaskList(tempList);
    
    // Store the updated array in localStorage.
    localStorage.setItem("taskList", JSON.stringify(tempList));
  };


  const updateListArray = (obj, index) => {
    // Create a copy of the taskList array to avoid mutating the state directly.
    let tempList = [...taskList];
    tempList[index] = obj;
  
    // Update the state with the new array.
    setTaskList(tempList);
  
    // Store the updated array in localStorage.
    localStorage.setItem("taskList", JSON.stringify(tempList));
  };

  const toggle = () => {
    setModal(!modal);
  }
    
    const saveTask = (taskObj) => {
      let tempList = taskList
      tempList.push(taskObj)
      localStorage.setItem("taskList", JSON.stringify(tempList))
      setTaskList(tempList)
      setModal(false)
    }

    

    return (
      <>
          <div className = "header text-center">
              <h3>Todo List</h3>
              <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
          </div>
          <div className = "task-container">
          {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
          </div>
          <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
      </>
  );
};

export default TodoList;