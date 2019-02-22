import React from 'react';

// Font Awesome components.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function AddTaskForm(props) {
    const { className } = props;

    return (
        <form
            id="new-task-form"
            className={`w-50 ${className}`}
        >
            <div
                className="input-group input-group-lg"
            >
                <input
                    required
                    id="task-text"
                    name="task"
                    placeholder="Enter a new task"
                    className="form-control form-control-lg rounded-0"
                />
                <div
                    className="input-group-append"
                >
                    <button
                        type="submit"
                        className="btn btn-lg btn-block btn-outline-info rounded-0"
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                        />
                    </button>
                </div>
            </div>
        </form>
    );
};