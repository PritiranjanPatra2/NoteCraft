import React from 'react'
import './Notes.css'

function Notes({ title, onDelete, index, setCurrentIndex }) {
  return (
    <div className='note'>
      <h2 onClick={() => setCurrentIndex(index)}>
        {title.length <= 18 ? title : title.substr(0, 18) + "..."}
      </h2>
      
      <button onClick={() => onDelete(index)}>delete</button>
    </div>
  )
}

export default Notes;
