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
    const { task, index, displayText, onDelete, onUpdate, onEdit, onEditInputChange } = props;

    const handleCompleteClick = (e) => {
        const newTask = {
            description: task.entity.description,
            isComplete: !task.entity.isComplete,
            isBeingEdited: false
        };

        onUpdate(task, newTask);
    };

    const handleEditClick = (e) => {
        task.entity.isBeingEdited = !task.entity.isBeingEdited;
        onEdit(task, index);
        if (task.entity.isBeingEdited) {
            document.getElementById(`input-${index}`).focus();
        }
    };

    const handleTaskUpdate = (e) => {
        const input = document.getElementById(`input-${index}`);
        const updatedTask = {
            description: input.value.trim(),
            isComplete: task.entity.isComplete,
            isBeingEdited: false
        };

        onUpdate(task, updatedTask);
    };

    const handleEditInputKeyUp = (e) => {
        const { target, keyCode } = e;
        if (keyCode === 13) {
            target.blur();
            return handleTaskUpdate(e);
        } else if (keyCode === 27) {
            target.blur();
            return handleEditClick(e);
        }
    };

    const handleEditInputFocusOut = (e) => {
        const elementsHovered = document.querySelectorAll(':hover');
        let isCancelClicked = false;
        for (let i = 0; i < elementsHovered.length; i++) {
            if (elementsHovered[i].className.includes('edit-button')) {
                isCancelClicked = true;
                break;
            }
        }

        if (isCancelClicked) return false;

        handleEditClick(e);
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
                        onClick={handleCompleteClick}
                        className="rounded-0 edit-button"
                    >
                        <FontAwesomeIcon
                            icon={(task.entity.isComplete ? faCheckSquare : faSquare)}
                            size="2x"
                        />
                    </Button>
                </InputGroupAddon>
                <Input
                    type="text"
                    bsSize="lg"
                    id={`input-${index}`}
                    value={displayText}
                    readOnly={!task.entity.isBeingEdited}
                    onClick={!task.entity.isBeingEdited ? (
                        () => handleEditClick(task, index)
                    ) : (
                            null
                        )}
                    onChange={onEditInputChange}
                    onKeyUp={handleEditInputKeyUp}
                    onBlur={handleEditInputFocusOut}
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
                {task.entity.isComplete || (
                    <Button
                        outline
                        color="warning"
                        onClick={handleEditClick}
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
                )}
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