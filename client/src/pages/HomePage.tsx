import axios from 'axios'
import React, { useState } from 'react'
import { Card, Grid, Header } from 'semantic-ui-react'
import FriendsBar from '../components/FriendsBar'
import PostCard from '../components/PostCard'
import { Post, User, Comment } from '../model'
import { SERVER, useFetch } from '../util'
axios.defaults.withCredentials = true;
interface Props {
    user: User
}

export default function HomePage(props: Props) {

    const [posts, setPosts] = useFetch<Post>('/post')
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
                                user: props.user
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
    const onDelete = async (id: number) => {
        await axios.delete(SERVER + '/post/' + id, { withCredentials: true });
        setPosts(prev => {
            return prev.filter(e => {
                return e.id !== id;
            })
        })
    }
    return (
        <Grid padded columns='16' >
            <Grid.Row>
                <Grid.Column width='1'>

                </Grid.Column>
                <Grid.Column width='10'>
                    <Card.Group itemsPerRow={1}>
                        {
                            posts.map(element => {
                                return (
                                    <PostCard onDelete={onDelete} onDeleteComment={onDeleteComment(element.id)} onAddComment={createComment(element.id)} user={props.user} open={open(element.id)} openComments={openPostComments.includes(element.id)} post={element} key={element.id} />
                                )
                            })
                        }
                    </Card.Group>
                </Grid.Column>
                <Grid.Column width='4'>
                    <Header>
                        Friends
                    </Header>
                    <FriendsBar user={props.user} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
