import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Image, Form, Header, Ref } from 'semantic-ui-react'
import { SERVER, setFormInputState } from '../util';

export default function Register() {

    const imageRef = useRef<HTMLDivElement>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setrepeat] = useState('')
    const loadImage = async () => {
        const res = await fetch(`https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}`)
        return res.blob();
    }

    return (
        <Form onSubmit={async () => {
            if (repeat !== password) {
                alert('Passwords do not match');
                return;
            }
            const imageElement = (imageRef.current)?.lastChild?.lastChild as HTMLInputElement | undefined;
            let image: any = null;
            if (!imageElement || !imageElement.files || imageElement.files.length === 0) {
                image = await loadImage();
            } else {
                image = imageElement.files[0];
            }

            const data = new FormData();
            data.append('firstName', firstName)
            data.append('lastName', lastName)
            data.append('email', email)
            data.append('password', password)
            data.append('image', image)

            await axios.post(SERVER + '/register', data, { withCredentials: true });
            window.location.reload();


        }}>
            <Header textAlign='center'>
                Register
            </Header>
            <Form.Input value={firstName} onChange={setFormInputState(setFirstName)} required label='First name ' />
            <Form.Input value={lastName} onChange={setFormInputState(setLastName)} required label='Last name ' />
            <Form.Input value={email} onChange={setFormInputState(setEmail)} required label='Email' />
            <Ref innerRef={imageRef}>
                <Form.Input type='file' label='Image' />
            </Ref>
            <Form.Input value={password} onChange={setFormInputState(setPassword)} required label='Password' type='password' />
            <Form.Input value={repeat} onChange={setFormInputState(setrepeat)} required label='Repeat password' type='password' />
            <Form.Button primary>Register</Form.Button>
        </Form>
    )
}
