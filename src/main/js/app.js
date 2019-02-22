'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import client from './client';

// Custom components.
import {
    AddTaskForm,
    TaskList
} from './components';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };
    }

    componentDidMount() {
        client({
            method: 'GET',
            path: '/api/tasks'
        }).done((response) => {
            const tasks = response.entity._embedded.tasks;
            tasks.forEach((task) => (task.isBeingEdited = false));
            this.setState({ tasks });
        });
    }

    render() {
        const { tasks } = this.state;
        return (
            <div
                className="app text-center"
            >
                <header>
                    <h1>Tasketeer</h1>
                </header>
                <main
                    className="p-5"
                >
                    <AddTaskForm
                        className="mx-auto"
                    />
                    <TaskList
                        tasks={tasks}
                    />
                </main>
                <footer></footer>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)