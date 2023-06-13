import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    console.log("in create area: ", note);
    fetch('http://localhost:8000/api/post', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: "roshannnn",
        content: "main content"
      }),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response.ok)
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(result => {
        console.log('Task saved successfully', result);
      })
      .catch(error => {
        console.error('Error saving task: ', error);
      });

    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            id="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          id="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Write your task..."
          rows={isExpanded ? 3 : 1}
        />
        <input type="submit" value="save" />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
