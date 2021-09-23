import axios from 'axios';
import React, { useState } from 'react'
import { Form, Header } from 'semantic-ui-react'
import { SERVER, setFormInputState } from '../util';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <Form onSubmit={() => {
            axios.post(SERVER + '/login', { email, password }, { withCredentials: true }).then(() => {
                window.location.reload();
            }).catch(() => {
                alert('Failed login')
            })
        }}>
            <Header textAlign='center'>
                Login
            </Header>
            <Form.Input value={email} onChange={setFormInputState(setEmail)} label='Email' />
            <Form.Input type='password' value={password} onChange={setFormInputState(setPassword)} label='Password' />
            <Form.Button primary>Login</Form.Button>
        </Form>
    )
}
