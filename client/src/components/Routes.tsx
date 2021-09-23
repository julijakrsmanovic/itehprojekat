

import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Grid, Image } from 'semantic-ui-react'
import { User } from '../model'
import PostsPage from '../pages/admin/PostsPage'
import UsersPage from '../pages/admin/UsersPage'
import ChatPage from '../pages/ChatPage'
import CreatePost from '../pages/CreatePost'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import Register from '../pages/Register'
import RequestsPage from '../pages/RequestsPage'
import SearchUsers from '../pages/SearchUsers'
import SettingsPage from '../pages/SettingsPage'
import UserPage from '../pages/UserPage'
interface Props {
    user?: User
}
export default function Routes(props: Props) {

    if (!props.user) {
        return (
            <Grid padded columns='16'>
                <Grid.Row>
                    <Grid.Column width='8'>
                        <Image fluid alt='WChat' src='https://media.istockphoto.com/vectors/social-network-vector-illustration-vector-id614250216' />
                    </Grid.Column>
                    <Grid.Column width='8'>
                        <Switch>
                            <Route path='/register'>
                                <Register />
                            </Route>
                            <Route path='/'>
                                <LoginPage />
                            </Route>
                        </Switch>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    if (!props.user.isAdmin)
        return (
            <Switch>

                <Route path='/post'>
                    <CreatePost />
                </Route>
                <Route path='/user/:id'>
                    <UserPage />
                </Route>
                <Route path='/user'>
                    <SearchUsers />
                </Route>
                <Route path='/request'>
                    <RequestsPage />
                </Route>

                <Route path='/chat'>
                    <ChatPage />
                </Route>

                <Route path='/settings'>
                    <SettingsPage />
                </Route>
                <Route path='/'>
                    <HomePage user={props.user} />
                </Route>
            </Switch>
        )
    return (
        <Switch >
            <Route path='/posts'>
                <PostsPage />
            </Route>
            <Route path='/users'>
                <UsersPage />
            </Route>
            <Route path='/'>
                <Redirect to='/users' />
            </Route>
        </Switch>
    )
}
