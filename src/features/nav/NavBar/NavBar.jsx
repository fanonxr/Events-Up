import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {
    // state for authentication
    state = {
        authenticated: false
    }

    // handle sign in and login
    handleSignIn = () => this.setState({ authenticated: true });
    handleSignOut = () => {
        this.setState({ authenticated: false });
        this.props.history.push('/');
    };

    render() {
        // get authenticated state
        const { authenticated } = this.state;

        return (
            <div>
                <Menu inverted fixed="top">
                    <Container>
                        <Menu.Item
                            as={NavLink}
                            to='/'
                            header
                        >
                            <img src="assets/logo.png" alt="logo" />
                            Events Up
                        </Menu.Item>
                        <Menu.Item as={NavLink} exact to='/events' name="Events" />
                        <Menu.Item as={NavLink} to='/people' name="People" />
                        {/* <Menu.Item as={NavLink} to='/test' name="test" /> */}
                        <Menu.Item>
                            <Button
                                as={Link}
                                to='/createEvent'
                                floated="right"
                                positive
                                inverted
                                content="Create Event"
                            />
                        </Menu.Item>
                        {authenticated ? (
                                <SignedInMenu signOut={this.handleSignOut} />
                        ) : (
                                <SignedOutMenu signIn={this.handleSignIn} />
                            )}
                    </Container>
                </Menu>
            </div>
        )
    }
}

export default withRouter(NavBar);

