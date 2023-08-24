import {useState} from "react";

import {AddTaskForm} from "./components/AddTaskForm";
import {TaskProvider} from "./components/TaskContext";
import TaskList from "./components/TaskList";
import Footer from "./Footer";

import IconMoon from "./assets/icon-moon.svg";
import IconSun from "./assets/icon-sun.svg";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [currentFilter, setCurrentFilter] = useState("All");

  const handleTaskAdded = () => {
    setCurrentFilter("All");
  };

  return (
    <TaskProvider>
      <main
        className={`min-h-[91vh] relative z-10 background_image_small ${
          isDarkMode
            ? "background_image_dark bg-[#181824]"
            : "background_image_light bg-[#f6f6f8]"
        } transition-colors md:background_image_large ${
          isDarkMode
            ? " md:background_image_dark_large"
            : " md:background_image_light_large"
        }`}
      >
        <div className=" py-16 mx-5 lg:max-w-[30em] lg:mx-auto">
          <div className=" flex justify-between items-center pb-3">
            <h1 className=" font-bold tracking-[0.3em] text-3xl text-white lg:text-5xl">
              TODO
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className=" p-3"
            >
              <img
                src={isDarkMode ? IconSun : IconMoon}
                alt=""
                aria-hidden
                className=" aspect-square max-w-[1.2em]"
              />
            </button>
          </div>
          <AddTaskForm isDarkMode={isDarkMode} onTaskAdded={handleTaskAdded} />

          <TaskList
            isDarkMode={isDarkMode}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <p className=" text-center pt-10 text-[#4f5160]">
            Drag and drop to reorder list
          </p>
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </TaskProvider>
  );
};

export default App;
