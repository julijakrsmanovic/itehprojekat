

import React from 'react'
import { User } from '../model'
import { Menu, Image, Dropdown } from 'semantic-ui-react'
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
                <Menu.Item as={Link} to='/request'>
                    Requests
                </Menu.Item>
                <Menu.Item as={Link} to='/post'>
                    Create post
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item inline trigger={(
                        <Image height='30' src={(SERVER + '/' + props.user.image)} />
                    )} >
                        <Dropdown.Menu>
                            <Dropdown.Header>
                                {props.user.firstName + ' ' + props.user.lastName}
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to='/settings'>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                axios.post(SERVER + '/logout').then(() => {
                                    window.location.reload();
                                })
                            }}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


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
                    <Image src={SERVER + '/' + props.user.image} />
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
