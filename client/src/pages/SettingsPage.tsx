import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, Divider, Image, Form, Grid, Header, Ref } from 'semantic-ui-react';
import { Context, SERVER, setFormInputState } from '../util'

export default function SettingsPage() {
    const context = useContext(Context);
    const user = context.user;
    const imageRef = useRef<HTMLDivElement>(null)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {

        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setImageUrl(user ? SERVER + '/' + user.image : '');
    }, [user])
    if (!user) {
        return null;
    }

    return (
        <Container>
            <Grid columns='16' padded  >
                <Grid.Row>
                    <Header >
                        Change basic info
                    </Header>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column width='12'>
                        <Form onSubmit={async e => {
                            const imageElement = (imageRef.current)?.lastChild?.lastChild as HTMLInputElement | undefined;
                            let image = undefined;
                            if (imageElement && imageElement.files) {
                                image = imageElement.files[0];
                            }
                            const data = new FormData();
                            data.append('firstName', firstName);
                            data.append('lastName', lastName);
                            if (image)
                                data.append('image', image);

                            const res = await axios.patch(SERVER + '/user', data);
                            context.setUser(res.data)
                            alert("Success")
                        }}>
                            <Form.Input value={firstName} onChange={setFormInputState(setFirstName)} label='First name' required />
                            <Form.Input value={lastName} onChange={setFormInputState(setLastName)} label='Last name' required />
                            <Ref innerRef={imageRef}>
                                <Form.Input onChange={e => {
                                    console.log('on change')
                                    console.log(e.currentTarget)
                                    const imageElement = e.currentTarget as HTMLInputElement;
                                    if (!imageElement || !imageElement.files) {
                                        return;
                                    }
                                    const image = imageElement.files[0];
                                    console.log(image);
                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                        //@ts-ignore
                                        setImageUrl(e.currentTarget.result);
                                    }
                                    reader.readAsDataURL(image);
                                }} type='file' label='Image' />
                            </Ref>
                            <Form.Button primary>Save</Form.Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width='4'>
                        <Image circular src={imageUrl} fluid />
                    </Grid.Column>
                </Grid.Row>


            </Grid>
        </Container>
    )
}
