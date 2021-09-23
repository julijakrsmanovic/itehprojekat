import axios from 'axios';
import React, { useRef, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import { Form, Grid, Header, Ref } from 'semantic-ui-react'
import { SERVER, setFormInputState } from '../util';
axios.defaults.withCredentials = true;
export default withRouter(function CreatePost(props: RouteComponentProps) {

    const imageRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState('');
    return (
        <Grid padded centered columns='16'>
            <Grid.Row>
                <Header textAlign='center'>
                    Create post
                </Header>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='7'>
                    <Form onSubmit={() => {
                        const imageElement = (imageRef.current)?.lastChild?.lastChild as HTMLInputElement | undefined;
                        if (!imageElement || !imageElement.files) {
                            return;
                        }
                        const image = imageElement.files[0];
                        const fd = new FormData();
                        fd.append('image', image);
                        fd.append('content', content);
                        axios.post(SERVER + '/post', fd).then(() => {
                            props.history.push('/')
                        })
                    }}>
                        <Ref innerRef={imageRef}>
                            <Form.Input required type='file' label='Image' />
                        </Ref>
                        <Form.TextArea required value={content} onChange={setFormInputState(setContent)} label='Content' />
                        <Form.Button fluid >Create post</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
)