import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.state = {
            miembros : props.miembros
        };
    }
    componentWillReceiveProps(newProps) {
        this.setState({miembros: newProps.miembros});
    }
    render() {
        const { miembros } = this.state;
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>SSN</th>
                    </tr>
                </thead>
                <tbody>
                    { miembros.map(miembro => {
                        const { firstName, lastName, address, ssn } = miembro
                        return (
                            <tr key={ ssn }>
                                <td>{ firstName }</td>
                                <td>{ lastName }</td>
                                <td>{ address }</td>
                                <td>{ ssn }</td>
                            </tr>
                        )})
                    }
                </tbody>
            </Table>
          )
    }
}
export default Tabla;
