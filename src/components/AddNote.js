import React, { useState , useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;

  const[note,setNote] = useState({title:"",description: "",tag: ""})
  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);	
    setNote({title:"",description: "",tag: ""})
    props.showAlert("Added Successfully","success")
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return(
      <div className="my-3 mx-5 text-start">
        <h1>Add your notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange = {onChange}  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange = {onChange} value={note.tag}  minLength={5} required/>
          </div>
          <button disabled={(note.title.length && note.description.length) < 5} type="submit" className="btn btn-primary" onClick= {handleClick}>Add Note</button>
        </form>
        <div/>
    </div>
    )
}

export default AddNote

