import {createContext, useContext, useState} from "react";

import {PropTypes} from "./taskUtils";

const TaskContext = createContext();

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? {...task, completed: true} : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const reorderTasks = (startIndex, endIndex) => {
    const reorderedTasks = Array.from(tasks);
    const [reorderedTask] = reorderedTasks.splice(startIndex, 1);
    reorderedTasks.splice(endIndex, 0, reorderedTask);
    setTasks(reorderedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        completeTask,
        deleteTask,
        clearCompletedTasks,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
  return useContext(TaskContext);
}
