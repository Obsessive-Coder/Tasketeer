import React, { Component } from 'react';

// Reactstrap components.
import { ListGroup } from 'reactstrap';

// Custom components.
import { Task } from '../';

class TaskList extends Component {
    render() {
        const { tasks, editText, onTaskDelete, onTaskUpdate, onTaskEdit, onTaskEditInputChange } = this.props;

        const incompleteTasks = tasks.filter((task) => !task.entity.isComplete);

        const taskComponents = incompleteTasks.map((task, index) => (
            <Task
                key={index}
                index={index}
                task={task}
                displayText={task.entity.isBeingEdited ? (
                    editText
                ) : (
                        task.entity.description
                    )}
                onDelete={onTaskDelete}
                onUpdate={onTaskUpdate}
                onEdit={onTaskEdit}
                onEditInputChange={onTaskEditInputChange}
            />
        ));

        return (
            <ListGroup>
                {taskComponents}
            </ListGroup>
        );
    }
}

export default TaskList;