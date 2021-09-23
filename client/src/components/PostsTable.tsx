import React, { useState } from 'react'
import { Table, Image, Button, Pagination } from 'semantic-ui-react'
import { Post } from '../model'
import { SERVER } from '../util'

interface Props {
    posts: Post[],
    onDelete: (id: number) => void
}

export default function PostsTable(props: Props) {
    const [activePage, setActivePage] = useState(1);
    const total = Math.ceil(props.posts.length / 5);
    return (
        <Table >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Image</Table.HeaderCell>
                    <Table.HeaderCell>Content</Table.HeaderCell>
                    <Table.HeaderCell>No. comments</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.posts.slice((activePage - 1) * 5, activePage * 5).map(element => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{element.id}</Table.Cell>
                                <Table.Cell>{element.user ? (element.user.firstName + ' ' + element.user.lastName) : 'NA'}</Table.Cell>
                                <Table.Cell>
                                    <Image src={SERVER + '/' + element.image} width='80' circular height='80' />
                                </Table.Cell>
                                <Table.Cell>{element.content.substring(0, 15)}</Table.Cell>
                                <Table.Cell>{element.comments.length}</Table.Cell>
                                <Table.Cell>
                                    <Button icon='delete' onClick={() => {
                                        props.onDelete(element.id)
                                    }} />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='6'>
                        <Pagination totalPages={total} activePage={activePage} onPageChange={(e, data) => {
                            setActivePage(data.activePage as number);
                        }} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
