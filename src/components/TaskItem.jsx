import React from "react";
import MyButton from './UI/MyButton/MyButton';
import MyModal from './UI/MyModal/MyModal';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from "./DeleteForm";
import axios from "axios";

function TaskItem({task, remove, note, taskList, setTaskList}) {
    const [name, setName] = React.useState(task.title);
    const [complete, setComplete] = React.useState(task.complete === 'true');
    const [updateModal, setUpdateModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [triggerUpdateName, setTriggerUpdateName] = React.useState(false);
    const [triggerComplete, setTriggerComplete] = React.useState(false);

    const handleComplete = () => {
        setComplete(!complete);
        setTriggerComplete(true);
        // axios.patch(`http://localhost:3000/data/${note.id}`, newNote);
    }

    React.useEffect(() => {
        if(triggerComplete) {
                const newNote = {
                ...note,
                tasks: [...taskList.filter(t => t.id !== task.id), {
                    ...task,
                    complete: (complete).toString()
                }]
            }

            setTaskList(newNote.tasks.sort((a, b) => a.id > b.id ? 1 : -1));
            axios.patch(`http://localhost:3000/data/${note.id}`, newNote);

            setTriggerComplete(false);
        }
    }, [complete]);

    const handleUpdate = () => {
        setUpdateModal(true);
        setTriggerUpdateName(true);
    }

    React.useEffect(() => {
        if(triggerUpdateName){
            const newNote = {
                ...note,
                tasks: [...note.tasks.filter(t => t.id !== task.id), {
                    ...task,
                    title: name
                }]
            }
            axios.patch(`http://localhost:3000/data/${note.id}`, newNote);
            setTriggerUpdateName(false);
        }
    }, [name]);

    const handleDelete = ()=>{
        setDeleteModal(true);
    }

    return (
        <li className="note__task">
            <MyModal visible={updateModal} setVisible={setUpdateModal}>
                <UpdateForm name={name} setName={setName} setUpdateModal={setUpdateModal}/>
            </MyModal>
            <MyModal visible={deleteModal} setVisible={setDeleteModal}>
                <DeleteForm setDeleteModal={setDeleteModal} remove={remove} item={task}/>
            </MyModal>
            <div className="note__task-name-container">
                <input
                    type="checkbox" 
                    name="checked" 
                    className="note__checkbox"
                    onClick={handleComplete}
                    defaultChecked={complete}
                />
                <label htmlFor="ckecked">{name}</label>
            </div>
            <div className="note__btns-container">
                <MyButton 
                    onClick={handleUpdate}
                >Редактировать</MyButton>
                <MyButton
                    onClick={handleDelete}
                >Удалить</MyButton>
            </div>
        </li>
    );
}

export default TaskItem;