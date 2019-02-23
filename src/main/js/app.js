'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import client from './client';

// Reactstrap components.
import { Container } from 'reactstrap';

// Custom components.
import {
    AddTaskForm,
    TaskList
} from './components';

const follow = require('./follow');

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.onNavigate = this.onNavigate.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.onCreateTask = this.onCreateTask.bind(this);
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
                return taskCollection;
            });
        }).done((taskCollection) => {
            const { entity } = taskCollection;
            this.setState({
                tasks: entity._embedded.tasks,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: entity._links
            });
        });
    }

    onNavigate(navUri) {
		client({
            method: 'GET',
            path: navUri
        }).done((taskCollection) => {
            const { attributes, pageSize } = this.state;
            const { entity } = taskCollection;
			this.setState({
				tasks: entity._embedded.tasks,
				attributes: attributes,
				pageSize: pageSize,
				links: entity._links
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
            path: task._links.self.href
        }).done((result) => {
            this.loadFromServer(this.state.pageSize);
        });
    }

    onCreateTask(newTask) {
        follow(client, root, ['tasks']).then((taskCollection) => {
            return client({
                method: 'POST',
                path: taskCollection.entity._links.self.href,
                entity: newTask,
                headers: { 'Content-Type': 'application/json' }
            });
        }).then((result) => {
            return follow(client, root, [{
                rel: 'tasks',
                params: { 'size': this.state.pageSize }
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
                        onTaskDelete={this.handleTaskDelete}
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