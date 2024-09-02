import React, { useState } from "react";
import moment from "moment";
import { Todo } from "../types";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.done);

  const toggleTodoStatus = async () => {
    try {
      await axiosInstance.put(`/todos/${todo.id}?done=${!isDone}`);

      toast.success("You changed the status of the Todo", {
        position: "top-right",
      });
      setIsDone(!isDone);
    } catch (error) {
      console.error("Error updating todo status:", error);
      toast.error("An error occurred while updating the Todo", {
        position: "top-right",
      });
    }
  };

  return (
    <div key={todo.id}>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {todo.content}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {moment(todo.due).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <button
          onClick={toggleTodoStatus}
          className={`px-4 py-2 rounded ${
            isDone ? "bg-green-500" : "bg-red-700"
          } text-white`}
        >
          {isDone ? "Done" : "Mark as done"}
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
