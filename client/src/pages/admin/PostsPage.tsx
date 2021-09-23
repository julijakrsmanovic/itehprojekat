import axios from 'axios';
import React, { useState } from 'react'
import { Container, Header, Input, Segment } from 'semantic-ui-react'
import PostsTable from '../../components/PostsTable';
import { Post } from '../../model';
import { useFetch, SERVER, setFormInputState } from '../../util';

export default function PostsPage() {
    const [posts, setPosts] = useFetch<Post>('/post')
    const [search, setSearch] = useState('')
    const onDelete = async (id: number) => {
        await axios.delete(SERVER + '/post/' + id, { withCredentials: true });
        setPosts(prev => {
            return prev.filter(e => {
                return e.id !== id;
            })
        })
    }

    return (
        <Container>
            <Header textAlign='center'>
                <h1>Search posts</h1>
            </Header>
            <Segment>
                <Input value={search} onChange={setFormInputState(setSearch)} fluid placeholder='Search...' />
            </Segment>
            <PostsTable posts={posts.filter(element => {
                return element.content.includes(search) || element.user?.firstName.includes(search) || element.user?.lastName.includes(search)
            })} onDelete={onDelete} />
        </Container>
    )
}
