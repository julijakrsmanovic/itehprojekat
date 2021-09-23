import axios from 'axios'
import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import UsersTable from '../../components/UsersTable'
import { User } from '../../model'
import { SERVER, useFetch } from '../../util'

export default function UsersPage() {
    const [users, setUsers] = useFetch<User>('/user')


    return (
        <Container>
            <Grid centered padded>
                <Grid.Row>
                    <Header textAlign='center'>
                        <h1>Users</h1>
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width='16'>
                        <UsersTable users={users.filter(e => !e.isAdmin)} onClick={async (id) => {
                            await axios.delete(SERVER + '/user/' + id);
                            setUsers(users.filter(e => e.id !== id))
                        }} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
