import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";

interface CreateTodoProps {
  onClose: () => void;
  addTodo: (todo: any) => void;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ onClose, addTodo }) => {
  const [content, setContent] = useState("");
  const [due, setDue] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    console.log("Creating todo...");
    try {
      await axiosInstance.post("/todos", {
        content,
        due,
        done,
      });

      addTodo({
        content,
        due,
        done,
      });
      toast.success("A new todo has been created!", {
        position: "top-right",
      });
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("An error occurred while creating the todo", {
        position: "top-right",
      });
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create a Todo
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5 space-y-4">
          <form className="mx-auto">
            <div className="mb-5">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Todo Content
              </label>
              <input
                type="text"
                id="content"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your task"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="due"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Due Date
              </label>
              <input
                type="date"
                id="due"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center mb-5">
              <input
                id="done"
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="done"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Are you done with this task?
              </label>
            </div>
          </form>
        </div>

        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Todo
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
