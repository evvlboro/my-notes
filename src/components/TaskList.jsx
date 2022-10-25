import React from "react";
import TaskItem from './TaskItem';

function TaskList({tasks, remove, note, taskList, setTaskList}) {
    
    return (
        <>
            {
                tasks.length > 0 
                &&
                <ul className="note__tasks">
                    {
                        taskList.map((task) => {
                            return <TaskItem
                                key={task.id}
                                task={task}
                                remove={remove}
                                note={note}
                                taskList={taskList}
                                setTaskList={setTaskList}
                            /> 
                        })
                    }
                </ul>
            }
        </>
    );
}

export default TaskList;