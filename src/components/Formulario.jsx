import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            address: "",
            ssn: "",
            firstNameValid: false,
            lastNameValid: false,
            addressValid: false,
            ssnValid: false,
            sendDisabled: true
        };
    
        this.handleInputChange = this.handleInputChange.bind(this)
        this.reset = this.reset.bind(this)
        this.sendMember = this.sendMember.bind(this)
    }
  
    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({[name]: value}, 
            () => { this.validateField(name, value) })
    }

    validateField(name, value){
        let fValid = this.state.firstNameValid
        let lValid = this.state.lastNameValid
        let aValid = this.state.addressValid
        let sValid = this.state.ssnValid
        let disable = this.state.sendDisabled

        switch(name){
            case 'firstName':
                fValid = value.trim().length > 1 ? true : false
                break;
            case 'lastName':
                lValid = value.trim().length > 1 ? true : false
                break;
            case 'address':
                aValid = value.trim().length > 1 ? true : false
                break;
            case 'ssn':
                const sssRegex = /^\d{3}-?\d{2}-?\d{4}$/
                sValid = sssRegex.test(value)
                break;
            default:
                break;
        }
        disable = !(fValid & lValid & aValid & sValid)
        this.setState({
            firstNameValid: fValid,
            lastNameValid: lValid,
            addressValid: aValid,
            ssnValid: sValid,
            sendDisabled: disable
        })
    }

    reset(){
        this.setState({
            firstName: "",
            lastName: "",
            address: "",
            ssn: "",
            firstNameValid: false,
            lastNameValid: false,
            addressValid: false,
            ssnValid: false,
            sendDisabled: true
        })
    }

    sendMember(){
        this.props.saveMember(this.state)
    }
  
    render() {
        return (
        <Form className="mb-3">
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={ this.handleInputChange }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={this.state.address} onChange={ this.handleInputChange }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSSN">
                <Form.Label>SSN</Form.Label>
                <Form.Control type="text" name="ssn" value={this.state.ssn} maxLength="11" onChange={ this.handleInputChange }/>
            </Form.Group>
            <div className="text-center">
                <Button variant="secundary" className="me-3" onClick={ this.reset }>
                    Reset 
                </Button>
                <Button variant="primary" className="ms-3" onClick={ !this.state.sendDisabled ? this.sendMember : null } disabled={this.state.sendDisabled}>
                    Save
                </Button>
            </div>
            
        </Form>
        );
    }
}
export default Formulario;

