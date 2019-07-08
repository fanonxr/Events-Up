import React from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';
import { Form, Label, Segment, List } from 'semantic-ui-react';

const PlaceInput = ({input: {value, onChange, onBlur}, width, options, placeholder, onSelect, meta: {touched, error}}) => {
    return (
        <PlacesAutoComplete
            value={value}
            onChange={onChange}
            search={options}
            onSelect={onSelect}
        >
            {/* we need a child component that will render on our page */}
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Form.Field error={touched && !!error}>
                    <input placeholder={placeholder} {...getInputProps({ placeholder, onBlur })} />
                    {touched && error && <Label basic color='red'>{error}</Label>}
                    {/* check to see if google api return suggestions */}
                    {suggestions.length > 0 && (
                        <Segment style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}>
                            {loading && <div>Loading...</div>}
                            <List selection>
                                {suggestions.map(suggestion => (
                                    <List.Item {...getSuggestionItemProps(suggestion)}>
                                        <List.Header>
                                            {suggestion.formattedSuggestion.mainText}
                                        </List.Header>
                                        <List.Description>
                                            {suggestion.formattedSuggestion.secondaryText}
                                        </List.Description>
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                    )}
                </Form.Field>
            )}
        </PlacesAutoComplete>
    )
}

export default PlaceInput
