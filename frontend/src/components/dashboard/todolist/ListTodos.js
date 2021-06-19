import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ parsedData, trip, setTrip }) => {
  // console.log(`1 ${parsedData}`);

  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTodo, setActiveTodo] = useState({});

  const myHeaders = new Headers();

  myHeaders.append("Content-type", "application/json");
  // FIX - UPDATE "token" to jwt_token, throughout app
  myHeaders.append("token", localStorage.token);

  // const fetchTodos = async () => {
  //   try {
  //     const data = await fetch("http://localhost:5000/dashboard/", {
  //       method: "GET",
  //       headers: myHeaders,
  //     });
  //     const allTodos = await data.json();
  //     console.log(allTodos);

  //     setTodos(allTodos);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: myHeaders,
      });
      console.log(res);
      // fetchTodos();
      // setTodos(todos.filter((todo) => todo.todo_id !== id));
      setTrip(!trip);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // fetchTodos();
    setTodos(parsedData);
  }, [parsedData]);

  return (
    <div className="todo_list">
      {todos.length !== 0 && !todos[0].todo_id ? (
        <h1>Add some tasks to the list!</h1>
      ) : (
        <>
          <table className="todo_table">
            <thead>
              <tr className="todo_row">
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr className="todo_card" key={todo.todo_id} id={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td className="todo__control">
                    <button
                      onClick={(e) => {
                        console.log(todo.todo_id);
                        setShowModal(true);
                        setActiveTodo(todo);
                      }}
                    >
                      Edit
                    </button>
                    {showModal && (
                      <EditTodo
                        todo={activeTodo}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        trip={trip}
                        setTrip={setTrip}
                      />
                    )}
                  </td>
                  <td className="todo__control">
                    <button onClick={(e) => deleteTodo(todo.todo_id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListTodos;
