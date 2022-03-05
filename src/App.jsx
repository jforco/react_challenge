import React, { Component } from 'react'
import Tabla from "./components/Tabla"
import Formulario from "./components/Formulario"
import { Container, Row, Col } from 'react-bootstrap'
import IdleTimer from 'react-idle-timer'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            miembros : [],
            token: ""
        };
        this.saveMember = this.saveMember.bind(this)
        this.handleOnIdle = this.handleOnIdle.bind(this)
    }
    async postFetchLogin() {
        //login
        var credentials = {'username': 'sarah','password': 'connor'}
        let result = await fetch("http://localhost:8081/auth", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(credentials), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        //save token
        this.setState({token: result.token});
        //get data
        this.getFetchMembers()
    }
    async getFetchMembers() {
        if(this.state.token === "") return
        //get members
        let result = await fetch("http://localhost:8081/api/members", {
            method: 'GET', // or 'PUT' // data can be `string` or {object}!
            headers:{
                'Authorization': "Bearer " + this.state.token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        //save in state, to render
        this.setState({miembros: result})
    }
    async postFetchMember(miembro) {
        if(this.state.token === "") return
        let result = await fetch("http://localhost:8081/api/members", {
            method: 'POST', // or 'PUT' // data can be `string` or {object}!
            headers:{
                'Authorization': "Bearer " + this.state.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(miembro),
        }).then(res => res.json())
        //result validation
        if(result.hasOwnProperty('ssn') && result.ssn === miembro.ssn){
            this.setState({miembros:[...this.state.miembros, miembro]})
        } else {
            alert(result.code + " - " + result.message)
        }
        
    }
    saveMember(miembro){
        this.postFetchMember(miembro)
    }
    
    handleOnIdle (event) {
        console.log("refresh table")
        //to see when is refreshing:
        //this.setState({miembros: []})
        this.getFetchMembers()
    }

    componentDidMount() {
        this.postFetchLogin();
    }
    render() {
        const { miembros } = this.state;
        return (
            <Container className="mt-3">
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    timeout={1000 * 5}
                    onIdle={this.handleOnIdle}
                    debounce={250}
                />
                <Row>
                    <Col>
                        <h1 className="text-center text-white bg-dark">Home</h1>
                        <Formulario saveMember={ this.saveMember } />
                    </Col>
                    <Col>
                        <h1 className="text-center text-white bg-dark">Members</h1>
                        <Tabla miembros={miembros}/>
                    </Col>
                </Row>
                <Row className="text-white bg-dark">
                    <Col><h5>CopyRight</h5></Col>
                    <Col><h5 className="text-end">All rights reserved</h5></Col>
                </Row>
            </Container>
        )
        
    }
}
export default App;