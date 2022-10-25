import React from "react";

import MyButton from './UI/MyButton/MyButton';
import TaskList from './TaskList';
import MyModal from './UI/MyModal/MyModal';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from './DeleteForm';
import AddForm from '../components/AddForm';
import axios from "axios";

function NoteItem({note, remove}) {
    const [name, setName] = React.useState(note.title);
    const [complete, setComplete] = React.useState(note.complete === 'true');
    const [tasks, setTasks] = React.useState(note.tasks || []);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);
    const [triggerUpdateName, setTriggerUpdateName] = React.useState(false);

    const handleComplete = () => {
        setComplete(!complete);
        const newNote = {
            ...note,
            complete: (!complete).toString()
        }
        axios.patch(`http://localhost:3000/data/${note.id}`, newNote);
    }

    const handleUpdate = () => {
        setUpdateModal(true);
        setTriggerUpdateName(true);
    }

    React.useEffect(() => {
        if(triggerUpdateName){
            const newNote = {
                ...note,
                title: name
            }
            axios.patch(`http://localhost:3000/data/${note.id}`, newNote);
            setTriggerUpdateName(false);
        }
    }, [name]);

    const removeTask = (task) => {
        setTasks(tasks.filter(t => t.id !== task.id));
    }

    const createTask = (newTask) => {
        setTasks([...tasks, newTask ]);
        setAddModal(false);
    }

    return (
        <div className="note">
            <MyModal visible={updateModal} setVisible={setUpdateModal}>
                <UpdateForm name={name} setName={setName} setUpdateModal={setUpdateModal}/>
            </MyModal>
            <MyModal visible={deleteModal} setVisible={setDeleteModal}>
                <DeleteForm setDeleteModal={setDeleteModal} remove={remove} item={note}/>
            </MyModal>
            <MyModal visible={addModal} setVisible={setAddModal}>
                <AddForm create={createTask}  isTask={true}/>
            </MyModal>
            <div className="note__title">
                <div className="note__task-name-container">
                    <input 
                        type="checkbox" 
                        name="note-checked" 
                        className="note__checkbox"
                        defaultChecked={complete}
                        onClick={handleComplete}
                    />
                    <label htmlFor="note-checked" className="note__task-name-container"><h3>{name}</h3></label>
                </div>
                <div className="note__btns-container">
                    <MyButton 
                        onClick={handleUpdate}
                    >Редактировать</MyButton>
                    <MyButton
                        onClick={()=>{
                            setDeleteModal(true);
                        }}
                    >Удалить</MyButton>
                </div>
            </div>
            <TaskList tasks={tasks} remove={removeTask}/>
            <MyButton onClick={() => setAddModal(true)}>
                Создать задачу
            </MyButton>
        </div>
    );
}

export default NoteItem;