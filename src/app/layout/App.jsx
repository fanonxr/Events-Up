import React, { Component, Fragment } from "react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router";

import HomePage from '../../features/home/HomePage';
import EventDetailed from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import EventForm from '../../features/event/EventForm/EventForm';
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from "../../features/modals/ModalManager";

class App extends Component {
    render() {
        return (
            <Fragment>
                <ModalManager />
                <Route exact path='/' component={HomePage} />
                <Route
                    path='/(.+)'
                    render={() => (
                        <Fragment>
                            <NavBar />
                            <Container className="main">
                                <Switch key={this.props.location.key}>
                                    <Route exact path='/events' component={EventDashboard} />
                                    <Route path='/event/:id' component={EventDetailed} />
                                    <Route path='/people' component={PeopleDashboard} />
                                    <Route path='/profile/:id' component={UserDetailedPage} />
                                    <Route path='/settings' component={SettingsDashboard} />
                                    <Route path={['/createEvent', '/manage/:id']} component={EventForm} />
                                    <Route path='/test' component={TestComponent}/>
                                </Switch>
                            </Container>
                        </Fragment>
                    )}
                />
            </Fragment>
        )
    }
}

// app now has access to the routing props
export default withRouter(App);
