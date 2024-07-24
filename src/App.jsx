import { useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import MarkdownEditor from '@uiw/react-markdown-editor';

function App() {
  const [note, setNote] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [save, setSave] = useState(false);

  function addNote() {
    let copyNote = [...note];
    let noteObj = {
      title: "# Enter Your title",
      desc: ""
    }
    copyNote.push(noteObj);
    setNote(copyNote);
    setCurrentIndex(copyNote.length - 1);
  }

  function deleteNote(index) {
    let copyNote = [...note];
    copyNote.splice(index, 1);
    if (copyNote.length === 0) {
      setCurrentIndex(null);
    } else if (currentIndex === index) {
      setCurrentIndex(null);
    }
    setNote(copyNote);
  }

  return (
    <>
      <div className="con">
        <div className="left">
          <button onClick={addNote}>Add Note</button>
          {note.map((item, index) => (
            <Notes
              key={index}
              title={item.title}
              desc={item.desc}
              setCurrentIndex={setCurrentIndex}
              onDelete={() => deleteNote(index)}
              index={index}
            />
          ))}
        </div>
        <div className="right">
          {currentIndex != null ? (
            <div className="markdown-editor">
              <h1 style={{ color: 'black' }}>Markdown Editor</h1>
              <MarkdownEditor
                value={note[currentIndex].desc}
                height="70vh"
                onChange={(value, viewUpdate) => {
                  let newValue = value;
                  let newTitle = value.split('\n')[0] || "# Enter Your Title";
                  let newArr = [...note];
                  newArr[currentIndex].title = newTitle;
                  newArr[currentIndex].desc = newValue;
                  setSave(true);
                  setNote(newArr);
                }}
                placeholder="# Enter Your Title"
              />
              {save && (
                <button className='save' onClick={() => {
                  setSave(false);
                  // console.log('Note saved:', note[currentIndex]);
                  alert(note[currentIndex].title+" saved Succesfully");
                  
                }}>
                  Save
                </button>
              )}
            </div>
          ) : (
            <div className="empty-state">Click on a note to edit it</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
