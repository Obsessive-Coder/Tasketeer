'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import when from 'when';
import client from './client';
import follow from './follow';

// Reactstrap components.
import { Container } from 'reactstrap';

// Custom components.
import {
    AddTaskForm,
    TaskList
} from './components';

// const follow = require('./follow');

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            links: [],
            editText: ''
        };
        this.onNavigate = this.onNavigate.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);
        this.onTaskEditInputChange = this.onTaskEditInputChange.bind(this);
        this.onCreateTask = this.onCreateTask.bind(this);
        this.onUpdateTask = this.onUpdateTask.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [{
            rel: 'tasks',
            params: { size: pageSize }
        }]).then((taskCollection) => {
            return client({
                method: 'GET',
                path: taskCollection.entity._links.profile.href,
                headers: { 'Accept': 'application/schema+json' }
            }).then((schema) => {
                this.schema = schema.entity;
                this.links = taskCollection.entity._links;
                return taskCollection;
            });
        }).then((taskCollection) => {
            const { tasks } = taskCollection.entity._embedded;
            return tasks.map((task) => {
                return client({
                    method: 'GET',
                    path: task._links.self.href
                });
            });
        }).then((taskPromises) => {
            return when.all(taskPromises);
        }).done((tasks) => {
            this.setState({
                tasks: tasks,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links,
                editText: ''
            });
        });
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then((taskCollection) => {
            this.links = taskCollection.entity._links;
            return taskCollection.entity._embedded.tasks.map((task) => {
                return client({
                    method: 'GET',
                    path: task._links.self.href
                });
            });
        }).then((taskPromises) => {
            return when.all(taskPromises);
        }).done((tasks) => {
            this.setState({
                tasks: tasks,
                attributes: Object.keys(this.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            });
        });
    }

    handleTaskSubmit(e) {
        e.preventDefault();
        const { target } = e;
        const newTask = {
            description: target.description.value.trim(),
            isComplete: false
        }

        this.onCreateTask(newTask);

        target.description.value = '';
    }

    handleTaskDelete(task) {
        client({
            method: 'DELETE',
            path: task.entity._links.self.href
        }).done((result) => {
            this.loadFromServer(this.state.pageSize);
        });
    }

    onTaskEdit(newTask, index) {
        const { tasks } = this.state;
        const editText = newTask.entity.description;
        tasks[index] = newTask;
        this.setState({ tasks, editText });
    }

    onTaskEditInputChange(e) {
        const editText = e.target.value;
        this.setState({ editText });
    }

    onCreateTask(newTask) {
        const self = this;
        follow(client, root, ['tasks']).then((result) => {
            return client({
                method: 'POST',
                path: result.entity._links.self.href,
                entity: newTask,
                headers: { 'Content-Type': 'application/json' }
            });
        }).then((result) => {
            return follow(client, root, [{
                rel: 'tasks',
                params: { 'size': self.state.pageSize }
            }]);
        }).done((result) => {
            const { _links } = result.entity;
            let link = _links.self.href;
            if (typeof _links.last !== 'undefined') {
                link = _links.last.href;
            }
            this.onNavigate(link);
        });
    }

    onUpdateTask(task, updatedTask) {
        client({
            method: 'PUT',
            path: task.entity._links.self.href,
            entity: updatedTask,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': task.headers.Etag
            }
        }).done((result) => {
            this.loadFromServer(this.state.pageSize);
        }, (result) => {
            if (result.status.code === 412) {
                alert(`DENIED: Unable to update ${task.entity._links.self.href}. Your copy is stale.`);
            }
        });
    }

    componentDidMount() {
        const { pageSize } = this.state;
        this.loadFromServer(pageSize);
    }

    render() {
        const { tasks } = this.state;
        return (
            <Container
                className="app text-center"
            >
                <header>
                    <h1>Tasketeer</h1>
                </header>
                <main
                    className="py-5 text-center"
                >
                    <AddTaskForm
                        handleTaskSubmit={this.handleTaskSubmit}
                    />
                    <TaskList
                        tasks={tasks}
                        links={this.state.links}
                        editText={this.state.editText}
                        onTaskDelete={this.handleTaskDelete}
                        onTaskUpdate={this.onUpdateTask}
                        onTaskEdit={this.onTaskEdit}
                        onTaskEditInputChange={this.onTaskEditInputChange}
                    />
                </main>
                <footer></footer>
            </Container>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)