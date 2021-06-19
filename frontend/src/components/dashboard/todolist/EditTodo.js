import React, { useState } from "react";

const EditTodo = ({ showModal, setShowModal, todo, trip, setTrip }) => {
  const [description, setDescription] = useState(todo.description);

  const myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");
  myHeaders.append("token", localStorage.token);

  const updateDescription = async () => {
    // console.log(`${description} TEST`);
    try {
      const body = { description };
      console.log(body);
      await fetch(`http://localhost:5000/dashboard/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      setTrip(!trip);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit__modal">
      <div className="modal__content">
        <h1>Edit Todo {todo.todo_id}</h1>
        <input
          type="text"
          placeholder={description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="modal__controls">
          <p>
            <span
              className="confirm__edit"
              onClick={(e) => {
                updateDescription();
                setShowModal(false);
              }}
            >
              Confirm Edit
            </span>
          </p>
          <p>
            <span
              className="confirm__edit"
              onClick={(e) => setShowModal(false)}
            >
              Close
            </span>
          </p>
        </div>

        <p>
          <span className="close__modal" onClick={(e) => setShowModal(false)}>
            X
          </span>
        </p>
      </div>
    </div>
  );
};

export default EditTodo;
