import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Grid, Input, Item } from 'semantic-ui-react'
import UserItem from '../components/UserItem'
import { User } from '../model'
import { Context, isFriend, SERVER, setFormInputState, useFetch } from '../util'

export default function SearchUsers() {

    const [users] = useFetch<User>('/user')
    const context = useContext(Context);
    const [search, setSearch] = useState('')
    const user = context.user



    if (!user) {
        return null;
    }
    return (

        <Grid padded centered columns='16' >
            <Grid.Row>
                <Grid.Column width='8'>
                    <Input value={search} onChange={setFormInputState(setSearch)} fluid placeholder='Search users...' />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='10'>
                    <Item.Group divided>
                        {
                            users.filter(element => {
                                return element.firstName.includes(search) || element.lastName.includes(search)
                            }).map(element => {
                                return (
                                    <UserItem key={element.id} user={element} friend={isFriend(element, user) || element.id === user.id} onClick={async () => {
                                        try {
                                            await axios.post(SERVER + '/relationsip', { id: element.id });
                                        } catch (error: any) {
                                            alert(error.response.data);
                                        }
                                    }} />
                                )
                            })
                        }
                    </Item.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
