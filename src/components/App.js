import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

import { CATEGORIES, TASKS } from "../data";

function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [filteredTasks, setFilteredTasks] = useState(TASKS);

  const handleTaskFormSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
    // Update filtered tasks based on the current selected category
    if (newTask.category === selectedCategory || selectedCategory === "All") {
      setFilteredTasks([...filteredTasks, newTask]);
    }
  }

  const handleTaskDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Update filtered tasks based on the current selected category
    if (selectedCategory === "All" || updatedTasks[index].category === selectedCategory) {
      setFilteredTasks(updatedTasks);
    }
  }

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Filter tasks based on the selected category
    if (category === "All") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.category === category);
      setFilteredTasks(filtered);
    }
  }

  return (
    <div className="App">
      <h2>My tasks</h2>
      <CategoryFilter categories={CATEGORIES} onSelect={handleCategorySelect} />
      <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={handleTaskFormSubmit} />
      <TaskList tasks={filteredTasks} onDelete={handleTaskDelete} />
    </div>
  );
}

export default App;
