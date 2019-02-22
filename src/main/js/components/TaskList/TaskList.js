import React, { Component } from 'react';

// Reactstrap components.
import { ListGroup } from 'reactstrap';

// Custom components.
import { Task } from '../';

class TaskList extends Component {
    render() {
        const { tasks, onTaskDelete } = this.props;
        const taskComponents = tasks.map((task, index) => (
            <Task
                key={task._links.self.href}
                idex={index}
                task={task}
                onDelete={onTaskDelete}
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