import React, { useState } from "react";

export default function Todo() {
  const [name, setname] = useState("Kiran");
  const [itemstodo, setitemstodo] = useState([
    { action: "Coding", done: "true" },
    { action: "Doing exercise", done: "false" },
    { action: "Reading", done: "true" },
    { action: "Surfing the internet", done: "false" },
  ]);
  //text written in the label for entering the new todo
  const [newtextItem, setnewtextItem] = useState("");

  const [print, setprint] = useState(false);

  function display(print){
    setprint(!print);
  }

  function createNewTodo() {
    setitemstodo([...itemstodo, { action: newtextItem, done: false }]);
    setnewtextItem("");
  }

  function toggleTodo(todo) {
    setitemstodo(
      itemstodo.map((item) =>
        todo.action === item.action ? { ...item, done: !item.done } : item
      )
    );
  }
      
  function tableTodo(doneValue) {
    return itemstodo
      .filter((item) => item.done === doneValue)
      .map((item, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.action}</td>
          <td>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleTodo(item)}
            />
          </td>
        </tr>
      ));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="bg-secondary text-center text-white m-3 p-3">
            {name}'s TODO LIST ({itemstodo.filter((task) => !task.done).length}
            &nbsp;Pending Tasks)
          </h2>
        </div>
      </div>
      <div className="row">
        <div className=" offset-md-2 col-md-8">
          <input
            type="text"
            value={newtextItem}
            className="form-control"
            placeholder="Enter New Task"
            onChange={(e) => setnewtextItem(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={createNewTodo}>
            Add
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="offset-md-2 col-md-8">
          <table className="table table-success table-striped table-bordered">
            <thead className="table table-dark">
              <tr>
                <th>S.No.</th>
                <th>Tasks To Do</th>
                <th>Done | Not Done</th>
              </tr>
            </thead>
            <tbody>{tableTodo(false)}</tbody>
          </table>
        </div>
      </div>
      <div>
        <input type="checkbox" checked = {print} onChange = {() => {display(print)}}/>
        &nbsp;
        <label htmlFor="">Show Completed</label>
      </div>
        {
          print ? (
            <div className="row mt-4">
            <div className="offset-md-2 col-md-8">
              <table className="table table-success table-striped table-bordered">
                <thead className="table table-dark">
                  <tr>
                    <th>S.No.</th>
                    <th>Tasks To Do</th>
                    <th>Done | Not Done</th>
                  </tr>
                </thead>
                <tbody>{tableTodo(true)}</tbody>
              </table>
            </div>
          </div>
          ) : null
        }
    </div>
  );
}
