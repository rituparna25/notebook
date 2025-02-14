import React,{useContext,useEffect,useRef,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


function Notes(props) 
{
  const context = useContext(NoteContext);
  const {notes,getNotes,editNote} = context;
  let navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/Login");
    }
   
  },[])

  
  const updateNote = (currentNote) => {
    // Modal toggle button
    const modalBtn = document.querySelector('[data-bs-toggle="modal"]');
    if (modalBtn) {
      modalBtn.click();
    }
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  }
  
  const ref = useRef(null)
  const refClose = useRef(null)
  const[note,setNote] = useState({id:"" ,etitle:"",edescription: "",etag: ""})
  
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (note.etitle.length < 5 || note.edescription.length < 5) {
        props.showAlert("Title and description must be at least 5 characters", "warning");
        return;
      }
      await editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success");
    } catch (error) {
      props.showAlert("Error updating note: " + error.message, "danger");
    }
  }
  
  
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    {/* Hidden button for modal toggle */}
    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch modal
      </button>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              <div className="mb-3 text-start">
                <label htmlFor="title" className="form-label fw-bold">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="description" className="form-label fw-bold">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange = {onChange} minLength={5} required/>
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="tag" className="form-label fw-bold">Tag</label>
                <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange = {onChange} minLength={5} required/>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    <div>
       <div className="row mx-5 text-start">
        <h2>Your notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) =>{
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
      </div>
    </div>
    </>
  )
}

export default Notes
