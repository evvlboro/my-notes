import React from "react";
import MyButton from './UI/MyButton/MyButton';
import MyModal from './UI/MyModal/MyModal';
import UpdateForm from '../components/UpdateForm';
import DeleteForm from "./DeleteForm";

function TaskItem({task, remove}) {
    const [name, setName] = React.useState(task.title);
    const [complete, setComplete] = React.useState(task.complete === 'true');
    const [updateModal, setUpdateModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);

    const handleComplete = () => {
        setComplete(!complete);
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
                    onClick={() => {
                        setUpdateModal(true);
                    }}
                >Редактировать</MyButton>
                <MyButton
                    onClick={()=>{
                        setDeleteModal(true);
                    }}
                >Удалить</MyButton>
            </div>
        </li>
    );
}

export default TaskItem;