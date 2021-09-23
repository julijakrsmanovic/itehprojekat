import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Item } from 'semantic-ui-react'
import { User } from '../model'
import { SERVER } from '../util'

interface Props {
    user: User,
    friend: boolean,
    onClick?: () => void
}

export default function UserItem(props: Props) {
    return (
        <Item as={Link} to={`/user/${props.user.id}`} key={props.user.id}>
            <Item.Image rounded size='tiny' src={SERVER + '/' + props.user.image} />
            <Item.Content verticalAlign='middle'>{props.user.firstName + ' ' + props.user.lastName}</Item.Content>
            {
                !props.friend && (
                    <Item.Extra  >
                        <Button floated='right' onClick={e => {
                            e.preventDefault();
                            if (props.onClick) {
                                props.onClick();
                            }
                        }} circular icon='user circle' />
                    </Item.Extra>
                )
            }
        </Item>
    )
}
