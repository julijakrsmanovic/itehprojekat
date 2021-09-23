import axios from 'axios';
import React, { useContext } from 'react'
import { Grid, Header, Item } from 'semantic-ui-react';
import FriendsBar from '../components/FriendsBar';
import RequestItem from '../components/RequestItem';
import { User } from '../model';
import { Context, SERVER, useFetch } from '../util';

export default function RequestsPage() {
    const context = useContext(Context);
    const [users] = useFetch<User>('/user')
    const user = context.user
    if (!user) {
        return null;
    }
    const friends = users.filter(u => {
        return u.id !== user.id && ((user.rel1.find(r => r.status === 'pending' && r.userId2 === u.id) !== undefined) || (user.rel2.find(r => r.status === 'pending' && r.userId1 === u.id) !== undefined))
    })

    const distinctFriends = friends.reduce((acc, element) => {
        if (acc.find(u => u.id === element.id) === undefined) {
            acc.push(element);
        }
        return acc;
    }, [] as User[])

    const onClick = (accept: boolean, id?: number) => async (e: any) => {
        e.preventDefault();
        if (!id) {
            return;
        }
        const res = await axios.patch(SERVER + '/relationsip/' + id, { accept });
        context.setUser(res.data);
    }

    return (
        <Grid padded columns='16'>
            <Grid.Row centered>
                <Grid.Column width='1'>

                </Grid.Column>
                <Grid.Column width='8'>
                    <Item.Group>
                        {
                            distinctFriends.map(element => {
                                return (
                                    <RequestItem key={element.id} user={element} onAccept={onClick(true, element.id)} onReject={onClick(false, element.id)} />
                                )
                            })
                        }
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width='2'>

                </Grid.Column>
                <Grid.Column width='4'>
                    <Header>
                        Friends
                    </Header>
                    <FriendsBar user={user} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
