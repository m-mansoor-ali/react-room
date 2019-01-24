import React, { Component } from 'react';
import './App.css';
import AppFlash from './components/AppFlash';
import AppNavBar from './components/AppNavBar';
import MessageBox from './components/MessageBox';
import * as mqtt from 'mqtt';
import * as socketurls from './socketurls';

import {
  ListGroup, ListGroupItem
} from 'reactstrap';

class App extends Component {

  _isMounted = false;
  client = null;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      connected: false,
      message: '',
    };
    this.connect = this.connect.bind(this);    
    this.onMessageSend = this.onMessageSend.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.connect();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  connect() {
    this.client = mqtt.connect(socketurls.ECLIPSE_URL);
    this.client.on('connect', () => {
      this.client.subscribe('react-room', (err) => {
        if (!err) {
          this.setState({
            connected: true
          });
          //this.client.publish('react-room', 'Hello mqtt');
        }
      });
      this.client.on('message', (topic, message) => {
        //console.log(message.toString());
        this.setState({
          messages: [message, ...this.state.messages]
        });
      });
    });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  onMessageSend(event) {
    if (this.state.message.trim() === "")
      return;
    this.client.publish('react-room', this.state.message.trim());
    this.setState({ message: '' });
  }

  render() {
    const {
      connected,
      message,
      messages
    } = this.state;
    return (
      <div>
        <AppNavBar />
        {!connected ?
          <AppFlash /> : <div>
            <MessageBox
              value={message}
              onChange={(e)=>{ this.onMessageChange(e)}}
              onSend={this.onMessageSend}
            />
            <code>{messages.length === 0 ? "Message queue is empty." : "Message queue:"}</code>
            <ListGroup>
              {
                messages.map((msg, index) => {
                  return <ListGroupItem key={"msg" + index} className="border-radius-0" >{msg.toString()}</ListGroupItem>
                })
              }
            </ListGroup>
          </div>
        }
      </div>
    );
  }
}

export default App;
