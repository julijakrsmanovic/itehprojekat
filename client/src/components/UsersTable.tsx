
import React, { useState } from 'react'
import { Table, Image, Button, Pagination } from 'semantic-ui-react'
import { User } from '../model'
import { SERVER } from '../util'

interface Props {
    users: User[],
    onClick: (id: number) => void
}

export default function UsersTable(props: Props) {
    const [activePage, setActivePage] = useState(1);
    const total = Math.ceil(props.users.length / 5);
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>First name</Table.HeaderCell>
                    <Table.HeaderCell>Last name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Image</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.users.slice((activePage - 1) * 5, activePage * 5).map(element => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{element.id}</Table.Cell>
                                <Table.Cell>{element.firstName}</Table.Cell>
                                <Table.Cell>{element.lastName}</Table.Cell>
                                <Table.Cell>{element.email}</Table.Cell>
                                <Table.Cell>
                                    <Image src={SERVER + '/' + element.image} width='50' height='50' circular />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button negative icon='delete' onClick={() => {
                                        props.onClick(element.id || 0);
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
                        <Pagination
                            totalPages={total}
                            activePage={activePage}
                            onPageChange={(e, data) => {
                                setActivePage(data.activePage as number);
                            }}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
