import React from "react";
import MyButton from "./UI/MyButton/MyButton";

function DeleteForm({setDeleteModal, remove, item}) {
    return (
        <form className="form__delete">
            <MyButton 
                onClick={(event)=>{
                    event.preventDefault();
                    remove(item);
                    setDeleteModal(false);
                }}
            >Удалить</MyButton>
            <MyButton 
                onClick={(event)=>{
                    event.preventDefault();
                    setDeleteModal(false);
                }}
            >Отмена</MyButton>
        </form>
    )
}

export default DeleteForm;