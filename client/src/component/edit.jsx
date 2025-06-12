import React, { useState, useEffect } from "react";
import axios from "axios";

function Edit({ editTodo, refreshTodos }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(editTodo.description);
  }, [editTodo]);

  async function updateTask() {
    try {
      await axios.put(`http://localhost:3000/todo/${editTodo.id}`, {
        description: description,
      });
      await refreshTodos();
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  const modalId = `modal-${editTodo.id}`;
  const labelId = `modalLabel-${editTodo.id}`;

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-warning px-4 py-2 rounded-pill shadow-sm"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={labelId}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={labelId}>
                Edit Description
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="type here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2 rounded-pill shadow-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm"
                onClick={updateTask}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
