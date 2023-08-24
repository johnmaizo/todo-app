import {useState} from "react";
import {useTask} from "./TaskContext";

import {PropTypes} from "./taskUtils";

export const AddTaskForm = ({isDarkMode, onTaskAdded}) => {
  const {addTask} = useTask();
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask({id: Date.now(), text: newTask, completed: false});
      setNewTask("");
      onTaskAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={` ${
        isDarkMode ? "bg-[#25273C]" : "bg-white"
      } flex p-4 rounded-lg items-center gap-4 mt-8 transition-colors`}
    >
      <button
        type="submit"
        aria-label="Add Task"
        className=" bg-transparent border-[#36384D] border-2 w-[1.5em] h-[1.5em] aspect-square rounded-full"
      ></button>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Create a new todo..."
        className={` bg-transparent w-full ${
          isDarkMode ? "text-[#C3C5DE]" : "text-[#3e3c44]"
        } py-1 leading-[2em]`}
      />
    </form>
  );
};

AddTaskForm.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onTaskAdded: PropTypes.func.isRequired,
};
