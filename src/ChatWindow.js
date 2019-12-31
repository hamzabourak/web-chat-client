import React, { Component } from 'react';
import minimizeIcon from './minimize.svg';
import maximizeIcon from './maximize.svg';
import closeIcon from './close.svg';
import sendIcon from './send.svg';
import './ChatWindow.css';

const MessageType = {
   inbound: 1,
   outbound: 2,
};

class ChatWindow extends Component {
  constructor(props) {
     super(props);

     this.onMinimize = this.onMinimize.bind(this);
     this.onClose = this.onClose.bind(this);
     this.onMessageChanged = this.onMessageChanged.bind(this);
     this.onSend = this.onSend.bind(this);
     this.state = {
         minimized: false,
         visible: true,
         messageText: '',
         messages: [{
             Id:1,
             type:1,
             text: 'Hi how are you doing',
         },
         {
            Id:2,
            type:2,
            text: 'Doing good',
        }],
     }
  }

  onMinimize() {
      this.setState({
         minimized: !this.state.minimized,
      });
  }

  onClose() {
    this.setState({
       visible: false,
    });
  }

  onMessageChanged(e) {
    this.setState({
        messageText: e.target.value,
    });
  }

  onSend() {
    const newMessage = {
        Id: this.state.messages.length,
        type: MessageType.outbound,
        text: this.state.messageText,
    };
    const newMessageList = this.state.messages;
    newMessageList.push(newMessage);

    this.setState({
        messages: newMessageList,
    });
  }

  render() {
    return  (this.state.visible && <div className="chatWindow">
      {!this.state.minimized &&
        <div>
            <div className='actions actionPanel'>
                <button onClick={this.onClose}>
                  <img src={closeIcon} alt="close" />
                </button>
                <button onClick={this.onMinimize}>
                  <img src={minimizeIcon} alt="minimize" />
                </button>
            </div>
            <br />   
            <div className="chatSpace">
                {this.state.messages.map(msg =>
                   <React.Fragment>
                        <div 
                            key={msg.id} 
                            className={'chatMessage ' + (msg.type == MessageType.inbound ? 'inboundMessage' :'outboundMessage')}>
                                <p className='chatText'>{msg.text}</p> 
                        </div>
                        <br />
                    </React.Fragment>)}    
            </div>     
            <div className="sendMessage">
                <input type="text" placeholder="Type a message ..." onChange={this.onMessageChanged} />
                <button className="sendBtn" onClick={this.onSend}>
                  <img src={sendIcon} alt="send" />
                </button>
            </div>
        </div>
      }
      {this.state.minimized &&
        <div className="actions">
            <p className="chatAd">Ask your questions here!</p>
            <button onClick={this.onClose}>
               <img src={closeIcon} alt="close" />
            </button>
            <button onClick={this.onMinimize}>
               <img src={maximizeIcon} alt="maximize" />
            </button>        
        </div>
      }
    </div>);
  }
}

export default ChatWindow;
