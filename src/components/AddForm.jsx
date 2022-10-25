import React from "react";
import MyButton from "./UI/MyButton/MyButton";
import MyInput from "./UI/MyInput/MyInput";

function AddForm({create, isTask = false}) {
    const [title, setTitle] = React.useState('');

    const addNew = (event) => {
        event.preventDefault();

        if(!isTask){
            create({
                id: Date.now().toString(),
                title: title,
                complete: 'false',
                tasks: []
            });
        } else {
            create({
                id: Date.now().toString(),
                title: title,
                complete: 'false'
            });
        }

        setTitle('');
    }

    return (
        <form>
            <MyInput 
                value={title}
                onChange={event => setTitle(event.target.value)}
                type="text"
                required
            />

            <MyButton onClick={addNew}>Создать</MyButton>
        </form>
    )
}

export default AddForm;