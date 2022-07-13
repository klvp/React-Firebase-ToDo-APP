/** @format */
import React, { useEffect, useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { Output } from "./Output";
import { PopupModal } from "./PopupModal";

function Home() {
  const [todos, setTodos] = useState([]);
  const todosCollectionRef = collection(db, "todos");
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [t, setT] = useState({});

  const ranEffect = useRef(true);

  const addTodo = (event) => {
    event.preventDefault();
    addDoc(todosCollectionRef, {
      todo: input,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setInput("");
      })
      .catch((err) => {
        alert(err.message);
      });
    setInput("");
  };

  const deleteTodo = (id) => {
    const docToDelete = doc(db, "todos", id);
    deleteDoc(docToDelete).catch((err) => alert(err.message));
  };

  // when apps load listen to the database and fetch new todos as they get added/removed
  const getTodos = async () => {
    const q = query(todosCollectionRef, orderBy("timestamp", "desc"));

    await onSnapshot(q, (res) => {
      setTodos(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    if (!ranEffect.current) {
      getTodos();
    }

    return () => {
      ranEffect.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTodo = (id) => {
    const docToUpdate = doc(db, "todos", id);
    updateDoc(docToUpdate, { todo: value, updatedAt: serverTimestamp() })
      .then(() => {
        setValue("");
        setShowModal(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="App">
      <h1> React 🚀 + Firebase 🔥 ToDo App</h1>

      <form onSubmit={addTodo} style={{ marginBottom: "1rem" }}>
        <TextField
          label="✔️ Enter Todo"
          required
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />{" "}
        <br /> <br />
        <Button variant="outlined" disabled={!input} type="submit">
          Add Task
        </Button>
      </form>

      <PopupModal
        showModal={showModal}
        setShowModal={setShowModal}
        setValue={setValue}
        value={value}
        t={t}
        updateTodo={updateTodo}
      />

      <Output
        todos={todos}
        setShowModal={setShowModal}
        setT={setT}
        setValue={setValue}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default Home;
