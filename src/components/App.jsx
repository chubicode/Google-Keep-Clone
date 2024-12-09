import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState(() => {
    // Load notes from localStorage when the app initializes
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add a new note with a color
  function addNote(newNote) {
    const coloredNote = {
      ...newNote,
      color: getRandomColor(), // Assign a random background color
    };
    setNotes((prevNotes) => [...prevNotes, coloredNote]);
  }

  // Delete a note by its index
  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
  }

  // Generate a random color for notes
  function getRandomColor() {
    const colors = ["#FFB6C1", "#FFD700", "#90EE90", "#ADD8E6", "#FF69B4"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          color={noteItem.color}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
