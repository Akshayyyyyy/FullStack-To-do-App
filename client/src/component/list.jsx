import axios from "axios";
import React, { useEffect, useState } from "react";
import Edit from "./edit";

function List() {
  const [data, setData] = useState([]);

  async function todoData() {
    try {
      const response = await axios.get("https://fullstack-to-do-app-x6e7.onrender.com/");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`https://fullstack-to-do-app-x6e7.onrender.com/${id}`);
      setData(data.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    todoData();
  }, []);

  return (
    <div className="container">
      <table className="table table-hover shadow-sm rounded table-borderless custom-table">
        <thead className="table-info">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((todoItem, index) => {
              return (
                <tr key={todoItem.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{todoItem.description}</td>
                  <td>
                    <Edit editTodo={todoItem} refreshTodos={todoData} />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger px-4 py-2 rounded-pill shadow-sm"
                      onClick={() => deleteTodo(todoItem.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
