import React from "react";
import MyButton from "./UI/MyButton/MyButton";
import MyInput from "./UI/MyInput/MyInput";

function AddForm({name, setName, setUpdateModal}) {
    const [title, setTitle] = React.useState(name || '');

    return (
        <form>
            <MyInput 
                value={title}
                onChange={event => setTitle(event.target.value)}
                type="text"
                required
            />

            <MyButton 
                onClick={(event)=>{
                    event.preventDefault();
                    setName(title);
                    setUpdateModal(false);
                }}
            >Сохранить</MyButton>
        </form>
    )
}

export default AddForm;