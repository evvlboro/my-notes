import React from "react";

import NoteItem from './NoteItem';

function NoteList({notes, remove, setaAddModal}) {
    return (
        <>
            {
                notes.length > 0 
                ?
                <div>
                    {
                        notes.map((note) => {
                            return <NoteItem
                                key={note.id}
                                note={note}
                                remove={remove}
                                setaAddModal={setaAddModal}
                            /> 
                        })
                    }
                </div>
                : <span>Заметки не найдены</span>
            }
        </>
    );
}

export default NoteList;