import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Comment, Form, Grid, Image, Popup } from 'semantic-ui-react'
import { Post, User } from '../model'
import { SERVER, setFormInputState } from '../util'

interface Props {
    post: Post,
    user: User,
    openComments: boolean,
    open: () => void,
    onDelete?: (id: number) => Promise<any>,
    onAddComment: (content: string) => Promise<any>,
    onDeleteComment: (id?: number) => Promise<any>
}

export default function PostCard(props: Props) {
    const [comment, setComment] = useState('')
    return (
        <Card  >
            <Card.Content>
                <Grid columns='16'>
                    <Grid.Row>
                        <Grid.Column width='15'>
                            <Card.Header as={Link} to={'/user/' + props.post.user?.id}>
                                {props.post.user ? props.post.user.firstName + ' ' + props.post.user.lastName : 'User no longer exists'}
                            </Card.Header>
                        </Grid.Column>
                        <Grid.Column width='1'>
                            {
                                props.user.id === props.post.user?.id && props.onDelete && (
                                    <Popup on='click' trigger={(<Button basic icon='ellipsis horizontal' />)}
                                        content={(
                                            <Button onClick={() => {
                                                if (!props.onDelete) {
                                                    return;
                                                }
                                                props.onDelete(props.post.id)
                                            }} negative icon='delete' />
                                        )}
                                    />
                                )
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
            <Image ui={false} src={SERVER + '/' + props.post.image} />
            <Card.Content>
                <Card.Description>{props.post.content}</Card.Description>
            </Card.Content>
            <Card.Content extra onClick={props.open}>
                <Form reply onSubmit={() => {
                    props.onAddComment(comment).then(() => {
                        setComment('');
                    })
                }}>
                    <Form.Input required value={comment} onChange={setFormInputState(setComment)} placeholder='Comment...' />
                </Form>
                <Comment.Group collapsed={!props.openComments} >
                    {
                        props.post.comments.slice().reverse().map(element => {
                            return (
                                <Comment key={element.id}>
                                    {
                                        (element.user?.id === props.user.id || props.post.user?.id === props.user.id) && (
                                            <Comment.Actions>

                                                <Comment.Action as={Button} onClick={() => {
                                                    props.onDeleteComment(element.id);
                                                }} color='red' floated='right' icon='delete'>

                                                </Comment.Action>

                                            </Comment.Actions>
                                        )
                                    }
                                    <Comment.Avatar src={SERVER + '/' + element.user?.image} />
                                    <Comment.Content>
                                        <Comment.Author as={Link} to={'/user/' + element.user?.id}>
                                            {element.user?.firstName + ' ' + element.user?.lastName}
                                        </Comment.Author>

                                        <Comment.Text>{element.content}</Comment.Text>

                                    </Comment.Content>
                                </Comment>
                            )
                        })
                    }
                </Comment.Group>
            </Card.Content>
        </Card>
    )
}
