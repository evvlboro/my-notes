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

    React.useEffect(() => {
        if (fetching) {
            axios.get(`http://localhost:3000/data?_limit=5&_page=${currentPage}`)
                .then(res => {
                    setNotes([...notes, ...res.data]);
                    console.log(currentPage);
                    setCurrentPage(pervState => pervState + 1);
                    setTotalCount(res.headers['x-total-count']);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching]);

    const createNote = (newNote) => {
        setNotes([newNote, ...notes ]);
        setAddModal(false);
    }

    const removeNote = (note) => {
        setNotes(notes.filter(n => n.id !== note.id));
    }

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
    });

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