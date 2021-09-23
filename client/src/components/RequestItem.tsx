import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Item } from 'semantic-ui-react'
import { User } from '../model'
import { SERVER } from '../util'

interface Props {
    user: User,

    onAccept: (e: any) => any,
    onReject: (e: any) => any
}

export default function RequestItem(props: Props) {
    return (
        <Item as={Link} to={`/user/${props.user.id}`} key={props.user.id}>
            <Item.Image rounded size='tiny' src={SERVER + '/' + props.user.image} />
            <Item.Content verticalAlign='middle'>{props.user.firstName + ' ' + props.user.lastName}</Item.Content>

            <Item.Extra  >
                <Button.Group floated='right'  >
                    <Button primary onClick={props.onAccept}>Accept</Button>
                    <Button negative onClick={props.onReject}>Reject</Button>
                </Button.Group>
            </Item.Extra>

        </Item>
    )
}
