import React, { Component } from 'react';

// Reactstrap components.
import { ListGroup } from 'reactstrap';

// Custom components.
import { Task } from '../';

class TaskList extends Component {
    render() {
        const { tasks } = this.props;
        const taskComponents = tasks.map((task, index) => (
            <Task
                key={task._links.self.href}
                idex={index}
                task={task}
            />
        ));

        return (
            <ListGroup
                className="m-5"
            >
                {taskComponents}
            </ListGroup>
        );
    }
}

export default TaskList;