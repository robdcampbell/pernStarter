import React, { useRef } from "react";

const InputTodo = ({ trip, setTrip }) => {
  //const [description, setDescription] = useState("");
  const description = useRef();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-type", "application/json");
      // FIX - UPDATE "token" to jwt_token, throughout app
      myHeaders.append("token", localStorage.token);

      const body = { description: description.current.value };
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      description.current.value = "";
      setTrip(!trip);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="todo__form" onSubmit={(e) => onSubmitForm(e)}>
      <h1>What's next?</h1>
      <div className="add__controls">
        <input
          type="text"
          placeholder="add todo"
          // value={description}
          // onChange={(e) => setDescription(e.target.value)}
          ref={description}
        />
        <button>Add</button>
      </div>
    </form>
  );
};

export default InputTodo;
