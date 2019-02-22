'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faTimes,
    faPen,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faSquare,
    faCheckSquare
} from '@fortawesome/free-regular-svg-icons';

// tag::app[]
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };
    }

    componentDidMount() {
        client({ method: 'GET', path: '/api/tasks' }).done(response => {
            const tasks = response.entity._embedded.tasks;
            tasks.forEach((task) => (task.isBeingEdited = false));
            console.log(tasks);
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
                    <TaskList
                        tasks={tasks}
                    />
                </main>
                <footer></footer>
            </div>

        )
    }
}
// end::app[]

// tag::task-list[]
class TaskList extends React.Component {
    render() {
        const { tasks } = this.props;
        const taskComponents = tasks.map((task, index) => (
            <Task
                key={task._links.self.href}
                index={index}
                task={task}
            />
        ));
        return (
            <ul
                className="list-group m-5"
            >
                {taskComponents}
            </ul>
        )
    }
}
// end::task-list[]

// tag::task[]
class Task extends React.Component {
    render() {
        const { task, index } = this.props;
        return (
            <li
                className="list-group-item rounded-0 d-flex p-0 mb-1"
            >
                <div
                    className="input-group input-group-lg"
                >
                    <div
                        className="input-group-prepend"
                    >
                        <CompleteButton
                            index={index}
                            className="edit-button"
                        >
                            {task.isComplete ? (
                                <FontAwesomeIcon icon={faCheckSquare} />
                            ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}

                        </CompleteButton>
                    </div>
                    <input
                        type="text"
                        id={`input-${index}`}
                        value={task.description}
                        readOnly={!task.isBeingEdited}
                        className="form-control form-control-lg rounded-0 bg-transparent h-100"
                    />
                </div>

                <div
                    className="d-flex"
                >
                    {task.isBeingEdited && (
                        <button
                            className="btn btn-outline-success rounded-0 edit-button"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    )}
                    <button
                        className="btn btn-outline-warning rounded-0 edit-button"
                    >
                        {task.isBeingEdited ? (
                            < FontAwesomeIcon icon={faTimes} />
                        ) : (
                                <FontAwesomeIcon icon={faPen} />
                            )}
                    </button>
                    <button
                        className="btn btn-outline-danger rounded-0 edit-button"
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </li>
        )
    }
}
// end::task[]

// tag::complete-button[]
class CompleteButton extends React.Component {
    render() {
        const { className, children } = this.props;

        return (
            <button
                className={`btn btn-outline-success rounded-0 ` + className}
            >
                {children}
            </button>
        );
    }
}
// end::complete-button[]

// tag::render[]
ReactDOM.render(
    <App />,
    document.getElementById('react')
)
// end::render[]