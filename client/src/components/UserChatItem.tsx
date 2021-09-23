import React from 'react'
import { Item } from 'semantic-ui-react'
import { User } from '../model'
import { SERVER } from '../util'
interface Props {
    user: User,

    onClick?: () => void
}
export default function UserChatItem(props: Props) {
    return (
        <Item className='chat-item' onClick={props.onClick}>

            <Item.Content >
                <Item.Image className='margin-right' width='90' height='90' circular size='tiny' src={SERVER + '/' + props.user.image} />
                {props.user.firstName + ' ' + props.user.lastName}
            </Item.Content>

        </Item>
    )
}
