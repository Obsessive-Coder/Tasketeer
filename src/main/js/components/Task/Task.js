import React from 'react';

// Reactstrap components.
import { Button } from 'reactstrap';

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
                                size="lg"
                            />
                        ) : (
                                <FontAwesomeIcon
                                    icon={faSquare}
                                    size="lg"
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
                    <Button
                        outline
                        color="success"
                        className="rounded-0 edit-button"
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            size="lg"
                        />
                    </Button>
                )}
                <button
                    className="btn btn-outline-warning rounded-0 edit-button"
                >
                    {task.isBeingEdited ? (
                        <FontAwesomeIcon
                            icon={faTimes}
                            size="lg"
                        />
                    ) : (
                            <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                            />
                        )}
                </button>
                <button
                    className="btn btn-outline-danger rounded-0 edit-button"
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="lg"
                    />
                </button>
            </div>
        </li>
    );
};