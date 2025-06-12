/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function Input() {
  const [description, setDescription] = useState("");
  async function onSubmit(e) {
    try {
      const body = { description };
      const response = await axios.post("https://fullstack-to-do-app-x6e7.onrender.com/", body);
      console.log(response.data);
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="text-center mb-4">To-Do List</h1>

      <form className="d-flex gap-3 mb-4" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-outline-success px-4 py-2 fs-5 rounded-pill shadow-sm"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Input;
