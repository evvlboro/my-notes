import React from "react";
import NoteList from '../components/NoteList';
import {data} from '../API/NoteServise';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/MyButton/MyButton';
import AddForm from '../components/AddForm';

function Notes() {
    const [notes, setNotes] = React.useState([]);
    const [addModal, setAddModal] = React.useState(false);

    React.useEffect(() => {
        setNotes(data);
    }, []);

    const createNote = (newNote) => {
        setNotes([newNote, ...notes ]);
        setAddModal(false);
    }

    const removeNote = (note) => {
        setNotes(notes.filter(n => n.id !== note.id));
    }

    return (
        <main className="main">
            <MyButton onClick={() => setAddModal(true)}>
                Создать заметку
            </MyButton>
            <MyModal visible={addModal} setVisible={setAddModal}>
                <AddForm create={createNote} />
            </MyModal>
            
            <NoteList notes={notes} setaAddModal={setAddModal} remove={removeNote}/>
        </main>
    );
}

export default Notes;