import React, { Component } from 'react';

// Reactstrap components.
import { ListGroup } from 'reactstrap';

// Custom components.
import { Task } from '../';

class TaskList extends Component {
    render() {
        const { tasks, onTaskDelete, onTaskUpdate } = this.props;
        console.log(tasks[0])
        const taskComponents = tasks.map((task, index) => (
            <Task
                key={index}
                index={index}
                task={task}
                onDelete={onTaskDelete}
                onUpdate={onTaskUpdate}
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