

import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Grid, Image } from 'semantic-ui-react'
import { User } from '../model'
import LoginPage from '../pages/LoginPage'
import Register from '../pages/Register'
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
                <Route path='/post/:id'>

                </Route>
                <Route path='/user/:id'>

                </Route>
                <Route path='/user'>

                </Route>
                <Route path='/chat/:id'>

                </Route>
                <Route path='/chat'>

                </Route>
                <Route path='/'>

                </Route>
            </Switch>
        )
    return (
        <Switch >
            <Route path='/posts'>

            </Route>
            <Route path='/users'>

            </Route>
            <Route path='/'>
                <Redirect to='/posts' />
            </Route>
        </Switch>
    )
}
