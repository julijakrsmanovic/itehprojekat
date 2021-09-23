import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Form, Grid, Input, Segment } from 'semantic-ui-react'
import UserChatItem from '../components/UserChatItem';
import { Message, User } from '../model';
import { useFetch, Context, isFriend, SERVER, setFormInputState } from '../util';

export default function ChatPage() {
    const [users, setUsers] = useFetch<User>('/user')
    const context = useContext(Context);
    const [selUserId, setSelUserId] = useState(0);
    const [message, setMessage] = useState('')
    const user = context.user
    if (!user) {
        return null;
    }
    let relNumber = 0;
    const friends = users.filter(u => isFriend(u, user));

    let rel = user.rel1.find(r => r.userId2 === selUserId);
    if (!rel) {
        rel = user.rel2.find(r => r.userId1 === selUserId);
        relNumber = 2;
    } else {
        relNumber = 1;
    }



    return (
        <Grid columns='16' padded>
            <Grid.Row>
                <Grid.Column width='2'>
                    {
                        friends.map(element => {
                            return (
                                <UserChatItem key={element.id} user={element} onClick={() => {
                                    setSelUserId(element.id || 0)
                                }} />
                            )
                        })
                    }
                </Grid.Column>
                <Grid.Column width='12'>
                    {
                        selUserId && rel ? (
                            <>
                                <Grid columns='16' className='chat' padded>
                                    {
                                        rel.messages.map(element => {
                                            return (
                                                <Grid.Row key={element.id}>
                                                    <Grid.Column width='3' floated={element.senderId === selUserId ? 'left' : 'right'}>
                                                        <Segment>
                                                            {element.content}
                                                        </Segment>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            )
                                        })
                                    }
                                    <Grid.Row>
                                        <Grid.Column width='16'>
                                            <Form reply onSubmit={async () => {
                                                const res = await axios.post(SERVER + '/message', {
                                                    userId: selUserId,
                                                    content: message,

                                                });
                                                const id = res.data.id;
                                                if (relNumber === 1) {
                                                    const newRel1 = user.rel1.map(element => {
                                                        if (element.userId1 === user.id && element.userId2 === selUserId) {
                                                            return {
                                                                ...element, messages: [
                                                                    ...element.messages, {
                                                                        id,
                                                                        content: message,
                                                                        senderId: user.id,
                                                                        userId1: user.id,
                                                                        userId2: selUserId
                                                                    } as Message
                                                                ]
                                                            }
                                                        }
                                                        return element;
                                                    })
                                                    context.setUser({
                                                        ...user,
                                                        rel1: newRel1
                                                    })
                                                    return;
                                                }
                                                if (relNumber === 2) {
                                                    const newRel2 = user.rel2.map(element => {
                                                        if (element.userId2 === user.id && element.userId1 === selUserId) {
                                                            return {
                                                                ...element, messages: [
                                                                    ...element.messages, {
                                                                        id,
                                                                        content: message,
                                                                        senderId: user.id,
                                                                        userId2: user.id,
                                                                        userId1: selUserId
                                                                    } as Message
                                                                ]
                                                            }
                                                        }
                                                        return element;
                                                    })
                                                    context.setUser({
                                                        ...user,
                                                        rel2: newRel2
                                                    })
                                                }

                                            }} >
                                                <Input value={message} onChange={setFormInputState(setMessage)} fluid placeholder='Message...' />
                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </>
                        ) : null
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
