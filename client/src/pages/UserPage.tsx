import axios from 'axios'
import React, { useContext, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Grid, Header, Segment, Image, Button, Card } from 'semantic-ui-react'
import FriendsBar from '../components/FriendsBar'
import PostCard from '../components/PostCard'
import { Post, User, Comment } from '../model'
import { Context, isFriend, SERVER, useFetch } from '../util'

axios.defaults.withCredentials = true;


export default withRouter(function UserPage(props: RouteComponentProps) {
    const context = useContext(Context);
    const user = context.user
    const [users] = useFetch<User>('/user');
    const [posts, setPosts] = useFetch<Post>('/post');
    const id = Number((props.match.params as any).id);
    const selUser = users.find(u => u.id === id);
    const [openPostComments, setOpenPostComments] = useState<number[]>([])

    const open = (postId: number) => () => {
        setOpenPostComments(prev => {
            if (prev.includes(postId)) {
                return prev;
            }
            return [...prev, postId]
        })
    }
    const createComment = (postId: number) => async (content: string) => {
        const res = await axios.patch(SERVER + '/post/' + postId + '/comment', { content });
        const id = res.data.id;
        setPosts(prev => {
            return prev.map(element => {
                if (element.id === postId) {
                    return {
                        ...element, comments: [
                            ...element.comments, {
                                id,
                                content,
                                user: user
                            } as Comment
                        ]
                    }
                }
                return element;
            })
        })
    }
    const onDeleteComment = (postId: number) => async (id?: number) => {
        if (!id) {
            return;
        }
        await axios.delete(SERVER + '/post/' + postId + '/comment/' + id);
        setPosts(prev => {
            return prev.map(element => {
                if (element.id === postId) {
                    return {
                        ...element, comments: element.comments.filter(c => c.id !== id)
                    }
                }
                return element;
            })
        })
    }
    if (!user || !selUser) {
        return null;
    }

    return (
        <Grid padded columns='16'>
            <Grid.Row centered>
                <Grid.Column width='1'>

                </Grid.Column>
                <Grid.Column width='10'>
                    <Segment >
                        <Image centered width='150' height='150' circular src={SERVER + '/' + selUser.image} />
                        <Header textAlign='center'>
                            <h1>
                                {selUser.firstName + ' ' + selUser.lastName}
                            </h1>
                        </Header>
                        {
                            (selUser.id !== user.id && !isFriend(selUser, user)) ? (
                                <Button primary onClick={async () => {
                                    try {
                                        await axios.post(SERVER + '/relationsip', { id: id });
                                    } catch (error: any) {
                                        alert(error.response.data);
                                    }
                                }}>Send request</Button>
                            ) : (
                                <div>
                                    <Header textAlign='center' r>User posts</Header>
                                    <Card.Group itemsPerRow={1}>
                                        {
                                            posts.filter(p => p.user?.id === selUser.id).map(element => {
                                                return (
                                                    <PostCard onDeleteComment={onDeleteComment(element.id)} onAddComment={createComment(element.id)} user={user} open={open(element.id)} openComments={openPostComments.includes(element.id)} post={element} key={element.id} />

                                                )
                                            })
                                        }
                                    </Card.Group>
                                </div>

                            )
                        }
                    </Segment>
                </Grid.Column>
                <Grid.Column width='4'>
                    <Header>
                        Friends
                    </Header>
                    <FriendsBar user={user} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})
