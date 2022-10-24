import React from "react";
import TaskItem from './TaskItem';

function TaskList({tasks, remove}) {
    return (
        <>
            {
                tasks.length > 0 
                &&
                <ul className="note__tasks">
                    {
                        tasks.map((task) => {
                            return <TaskItem
                                key={task.id}
                                task={task}
                                remove={remove}
                            /> 
                        })
                    }
                </ul>
            }
        </>
    );
}

export default TaskList;