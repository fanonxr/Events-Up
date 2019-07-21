import React from 'react'
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react';

const UserDetailedDescription = ({ profile }) => {
    return (
        <Grid.Column width={12}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Header icon="smile" content="About display Name" />
                        <p>Occupation: {profile.occupation || 'tbh'} </p>
                        <p>Location: {profile.origin || 'tbh'} </p>
                        <p>{profile.description}</p>
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Header icon="Heart outline" content="Interest" />
                        {profile.interests ?
                            <List>
                                {profile.interests &&
                                    profile.interests.map((interest, index) => (
                                        <Item key={index}>
                                            <Icon name="heart" />
                                            <Item.Content>{interest}</Item.Content>
                                        </Item>
                                    ))
                                }
                            </List> : <p>No interests</p>
                        }
                    </Grid.Column>
                </Grid>
            </Segment>
        </Grid.Column>
    );
};

export default UserDetailedDescription;
