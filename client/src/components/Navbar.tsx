

import React from 'react'
import { User } from '../model'
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SERVER } from '../util'
axios.defaults.withCredentials = true;
interface Props {
    user?: User
}
export default function Navbar(props: Props) {

    if (!props.user) {
        return (
            <Menu borderless fluid>
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/'>
                        Login
                    </Menu.Item>
                    <Menu.Item as={Link} to='/register'>
                        Regoster
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }

    if (!props.user.isAdmin)
        return (
            <Menu borderless fluid>

                <Menu.Item as={Link} to='/'>
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to='/user'>
                    Search  Users
                </Menu.Item>

                <Menu.Item as={Link} to='/chat'>
                    Chat
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Image height='30' src={(SERVER + '/' + props.user.image)} />
                    </Menu.Item>
                    <Menu.Item link onClick={() => {
                        axios.post(SERVER + '/logout').then(() => {
                            window.location.reload();
                        })
                    }}>Logout</Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    return (
        <Menu borderless fluid >
            <Menu.Item as={Link} to='/users'>
                Users
            </Menu.Item>
            <Menu.Item as={Link} to='/posts'>
                Posts
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Image src={props.user.image} />
                </Menu.Item>
                <Menu.Item link onClick={() => {
                    axios.post(SERVER + '/logout').then(() => {
                        window.location.reload();
                    })
                }}>Logout</Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
