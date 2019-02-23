import React from 'react';

// Reactstrap components.
import {
    InputGroup,
    InputGroupAddon,
    ListGroupItem,
    Input,
    Button
} from 'reactstrap';

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

export default function Task(props) {
    const { task, index, onDelete, onUpdate } = props;

    const handleTaskUpdate = (e) => {
        const input = document.getElementById(`input-${index}`);
        const updatedTask = {
            description: input.value.trim(),
            isComplete: task.entity.isComplete
        };

        onUpdate(task, updatedTask);
    };

    return (
        <ListGroupItem
            className="d-flex p-0 mb-1 rounded-0"
        >
            <InputGroup
                size="lg"
            >
                <InputGroupAddon
                    addonType="prepend"
                >
                    <Button
                        outline
                        color="success"
                        className="rounded-0 edit-button"
                    >
                        {task.entity.isComplete ? (
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
                    </Button>
                </InputGroupAddon>
                <Input
                    type="text"
                    bsSize="lg"
                    id={`input-${index}`}
                    value={task.entity.description}
                    readOnly={!task.entity.isBeingEdited}
                    className="rounded-0 bg-transparent h-100"
                />
            </InputGroup>
            <div
                className="d-flex"
            >
                {task.entity.isBeingEdited && (
                    <Button
                        outline
                        color="success"
                        onClick={handleTaskUpdate}
                        className="rounded-0 edit-button"
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            size="lg"
                        />
                    </Button>
                )}
                <Button
                    outline
                    color="warning"
                    className="rounded-0 edit-button"
                >
                    {task.entity.isBeingEdited ? (
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
                </Button>
                <Button
                    outline
                    color="danger"
                    onClick={() => onDelete(task)}
                    className="rounded-0 edit-button"
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="lg"
                    />
                </Button>
            </div>
        </ListGroupItem>
    );
};