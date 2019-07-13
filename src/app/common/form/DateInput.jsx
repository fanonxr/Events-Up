import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({input: {value, onChange, ...restInput}, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error}>
            <DatePicker
                {...rest}
                placeholderText={placeholder}
                selected={value ? new Date(value) : null}
                onChange={onChange}
                {...restInput}
                // onBlur={onBlur}
                // onChangeRaw={(e) => e.preventDefault()}
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

export default DateInput;
