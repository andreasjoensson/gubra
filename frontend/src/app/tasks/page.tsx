"use client";
import { useState, useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { Todo } from "../types";
import { ToastContainer } from "react-toastify";
import CreateTodo from "../components/CreateTodo";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";

export default function page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        toast.error("An error occurred while fetching the todos", {
          position: "top-right",
        });
      });
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };
  return (
    <main className="container flex min-h-screen flex-col items-center p-24">
      <div className="w-full">
        <button
          onClick={() => setIsModalOpen(true)}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mb-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Create Todo
        </button>
      </div>
      <ToastContainer />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>

      {isModalOpen && (
        <CreateTodo addTodo={addTodo} onClose={() => setIsModalOpen(false)} />
      )}
    </main>
  );
}
