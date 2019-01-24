import React, { Component } from 'react';
import {
    Button, Form, Input, InputGroup, InputGroupAddon
} from 'reactstrap';

class MessageBox extends Component {
 
    render() {
        const {
            value,
            onSend,
            onChange
        } = this.props;

        return (
            <Form onSubmit={(event) => { event.preventDefault(); this.props.onSend() }}>
                <code>Enter message and press enter / click send.</code>
                <InputGroup>
                    <Input placeholder="Enter message here..." onChange={onChange} value={value} />
                    <InputGroupAddon addonType="append"><Button className="border-radius-0" color="info" onClick={onSend} >Send</Button></InputGroupAddon>
                </InputGroup>
            </Form>
        );
    }
}

export default MessageBox;
//functional