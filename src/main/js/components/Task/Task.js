import React from 'react';

// Font Awesome components.
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

// Custom components.
import { CompleteButton } from '../';

export default function Task(props) {
    const { task, index } = props;

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
                            <FontAwesomeIcon
                                icon={faCheckSquare}
                            />
                        ) : (
                                <FontAwesomeIcon
                                    icon={faSquare}
                                />
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
                        <FontAwesomeIcon
                            icon={faCheck}
                        />
                    </button>
                )}
                <button
                    className="btn btn-outline-warning rounded-0 edit-button"
                >
                    {task.isBeingEdited ? (
                        <FontAwesomeIcon
                            icon={faTimes}
                        />
                    ) : (
                            <FontAwesomeIcon
                                icon={faPen}
                            />
                        )}
                </button>
                <button
                    className="btn btn-outline-danger rounded-0 edit-button"
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                    />
                </button>
            </div>
        </li>
    );
};