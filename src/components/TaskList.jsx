import {PropTypes} from "./taskUtils";
import {useEffect, useState} from "react";
import {useTask} from "./TaskContext";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

import IconCheck from "../assets/icon-check.svg";
import IconCross from "../assets/icon-cross.svg";

export default function TaskList({
  isDarkMode,
  currentFilter,
  setCurrentFilter,
}) {
  const {tasks, completeTask, deleteTask, reorderTasks, clearCompletedTasks} =
    useTask();

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "All") {
      return true;
    } else if (currentFilter === "Active") {
      return !task.completed;
    } else if (currentFilter === "Completed") {
      return task.completed;
    }
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    reorderTasks(result.source.index, result.destination.index);
  };

  const handleCompleteTask = (taskId) => {
    if (currentFilter !== "Completed") {
      completeTask(taskId);
      setCurrentFilter("All");
    }
  };

  const [itemsLeft, setItemsLeft] = useState(0);

  useEffect(() => {
    if (currentFilter === "All" || currentFilter === "Active") {
      setItemsLeft(filteredTasks.filter((task) => !task.completed).length);
    } else if (currentFilter === "Completed") {
      setItemsLeft(filteredTasks.filter((task) => task.completed).length);
    }
  }, [currentFilter, filteredTasks]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList" type="TASK">
          {(provided) => (
            <>
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={` ${
                  isDarkMode ? "bg-[#25273C]" : "bg-white"
                } mt-5 box_curve_top min-h-[18px] ${
                  filteredTasks.length === 0 ? "rounded-lg" : ""
                } shadow-xl transition-colors`}
              >
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={` block py-3 px-2 min-h-[18px] box ${
                            isDarkMode ? "box_dark" : "box_light"
                          }`}
                        >
                          <div className=" min-h-[18px] flex justify-between items-center gap-4 pl-2 py-1">
                            <button
                              onClick={() => handleCompleteTask(task.id)}
                              aria-label="Task Complete"
                              className={` bg-transparent border-[#36384D] border-2 w-[1.5em] h-[1.5em] aspect-square rounded-full ${
                                task.completed
                                  ? "grid place-items-center checked_BG"
                                  : ""
                              }`}
                            >
                              {task.completed && (
                                <img
                                  src={IconCheck}
                                  alt="Icon Check"
                                  className=" aspect-square w-[0.6em]"
                                />
                              )}
                            </button>

                            <p
                              className={` min-h-[18px] leading-[2em] ${
                                task.completed ? "line-through" : ""
                              } ${
                                isDarkMode ? "text-[#A2A4BD]" : "text-[#3e3c44]"
                              } ${
                                isDarkMode && task.completed
                                  ? "text-[#54566d]"
                                  : ""
                              } ${
                                !isDarkMode && task.completed
                                  ? "text-[#a9a7b0]"
                                  : ""
                              }`}
                            >
                              {task.text}
                            </p>

                            <button
                              onClick={() => deleteTask(task.id)}
                              aria-label="Delete Task"
                              className=" ml-auto p-2"
                            >
                              <img
                                src={IconCross}
                                alt="Icon Cross"
                                className=" aspect-square max-w-[1.1em]"
                              />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p className=" text-center text-[#A2A4BD] py-8">
                    No tasks to show..
                  </p>
                )}
                {provided.placeholder}
              </ul>

              {filteredTasks.length > 0 && (
                <div
                  className={`${
                    isDarkMode ? "bg-[#25273C]" : "bg-white"
                  } py-4 flex justify-between px-5 text-[0.9rem] box_curve_bottom text-[#60627a] shadow-xl transition-colors`}
                >
                  <p>{itemsLeft} item(s) left</p>
                  <button
                    onClick={() => {
                      clearCompletedTasks();
                    }}
                  >
                    Clear Completed
                  </button>
                </div>
              )}
            </>
          )}
        </Droppable>
      </DragDropContext>

      <div
        className={`${
          isDarkMode ? "bg-[#25273C]" : "bg-white"
        } font-bold flex justify-center mt-5 rounded-lg shadow-xl transition-colors`}
      >
        <div className=" flex gap-6 text-[#6c6e89] flex-wrap justify-center text-[1rem]">
          <button
            onClick={() => setCurrentFilter("All")}
            className={` p-4 ${
              currentFilter === "All" ? "text-[#5b7ac0]" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCurrentFilter("Active")}
            className={` p-4 ${
              currentFilter === "Active" ? "text-[#5b7ac0]" : ""
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setCurrentFilter("Completed")}
            className={` p-4 ${
              currentFilter === "Completed" ? "text-[#5b7ac0]" : ""
            }`}
          >
            Completed
          </button>
        </div>
      </div>
    </>
  );
}

TaskList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  currentFilter: PropTypes.string.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
};
