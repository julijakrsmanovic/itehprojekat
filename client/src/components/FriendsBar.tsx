import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react'
import { User } from '../model'
import { isFriend, SERVER, useFetch } from '../util';

interface Props {
    user: User
}

export default function FriendsBar(props: Props) {

    const [users] = useFetch<User>('/user')
    const friends = users.filter(user => {
        return isFriend(user, props.user);
    })
    console.log(friends)
    const distinctFriends = friends.reduce((acc, element) => {
        if (acc.find(u => u.id === element.id) === undefined) {
            acc.push(element);
        }
        return acc;
    }, [] as User[])

    return (
        <Item.Group relaxed >
            {
                distinctFriends.map(element => {
                    return (
                        <Item as={Link} to={`/user/${element.id}`} key={element.id}>
                            <Item.Image rounded size='tiny' src={SERVER + '/' + element.image} />
                            <Item.Content verticalAlign='middle'>{element.firstName + ' ' + element.lastName}</Item.Content>
                        </Item>
                    )
                })
            }
        </Item.Group>
    )
}
