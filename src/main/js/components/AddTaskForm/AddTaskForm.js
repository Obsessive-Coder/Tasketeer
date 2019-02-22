import React from 'react';

// Reactstrap components.
import {
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

// Font Awesome components.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function AddTaskForm(props) {
    const { className } = props;

    return (
        <Form
            id="new-task-form"
            className={`w-50 ${className}`}
        >
            <FormGroup>
                <InputGroup
                    size="lg"
                >
                    <Input
                        required
                        bsSize="lg"
                        id="task-text"
                        name="task"
                        placeholder="Enter a new task"
                        className="rounded-0"
                    />
                    <InputGroupAddon
                        addonType="append"
                    >
                        <Button
                            outline
                            block
                            color="info"
                            size="lg"
                            type="submit"
                            className="rounded-0 edit-button"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="lg"
                            />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
    );
};