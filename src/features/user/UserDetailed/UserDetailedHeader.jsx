import React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';

const UserDetailedHeader = ({ profile }) => {

    return (
        <Grid.Column width={16}>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size="small" src={profile.photoURL || '/assets/user.png'} />
                        <Item.Content verticalAlign="bottom">
                            <Header as="h1">{profile.displayName}</Header>
                            <br />
                            <Header as="h3">{profile.occupation}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedHeader;