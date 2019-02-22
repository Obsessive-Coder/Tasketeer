import React, { Component } from 'react';

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
            <ul
                className="list-group m-5"
            >
                {taskComponents}
            </ul>
        );
    }
}

export default TaskList;