import React from "react";
import NoteList from '../components/NoteList';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/MyButton/MyButton';
import AddForm from '../components/AddForm';

import axios from "axios";

function Notes() {
    const [notes, setNotes] = React.useState([]);
    const [addModal, setAddModal] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [fetching, setFetching] = React.useState(true);
    const [totalCount, setTotalCount] = React.useState(0);

    const scrollHandler = (event) => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100 
            && notes.length < totalCount
        ) {
            setFetching(true);
        }
    }

    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function() {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalCount]);

    React.useEffect(() => {
        if (fetching) {
            axios.get(`http://localhost:3000/data?_limit=5&_page=${currentPage}`)
                .then(res => {
                    setNotes([...notes, ...res.data]);
                    setCurrentPage(currentPage + 1);
                    setTotalCount(res.headers['x-total-count']);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching]);

    const createNote = (newNote) => {
        setNotes([...notes, newNote]);
        axios.post('http://localhost:3000/data', newNote);
        setAddModal(false);
    }

    const removeNote = (note) => {
        setNotes(notes.filter(n => n.id !== note.id));
        axios.delete(`http://localhost:3000/data/${note.id}`);
    }

    return (
        <main className="main">
            <NoteList notes={notes} setaAddModal={setAddModal} remove={removeNote}/>
            <MyModal visible={addModal} setVisible={setAddModal}>
                <AddForm create={createNote} />
            </MyModal>
            <MyButton onClick={() => setAddModal(true)}>
                Создать заметку
            </MyButton>
        </main>
    );
}

export default Notes;