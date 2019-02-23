import React, { Component } from 'react';

// Reactstrap components.
import { ListGroup } from 'reactstrap';

// Custom components.
import { Task } from '../';

class TaskList extends Component {
    render() {
        const { tasks, headingText, className, editText, onTaskDelete, onTaskUpdate, onTaskEdit, onTaskEditInputChange } = this.props;

        const taskComponents = tasks.map((task, index) => (
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
            <div
                className={`mx-3 my-3 ${className}`}
            >
                <h2>{headingText}</h2>
                <ListGroup>
                    {taskComponents}
                </ListGroup>
            </div>
        );
    }
}

export default TaskList;