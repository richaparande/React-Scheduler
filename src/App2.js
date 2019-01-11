import React, { Component } from 'react';
import Modal from 'react-modal'
import './App.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class Timeslot extends Component {
  constructor() {
     super();
     this.state = {
        name: '',
        phone: '',
        modalIsOpen: false
     };
  }

  openModal() {
    this.setState({modalIsOpen:true})
  }

  closeModal() {
    this.setState({modalIsOpen:false})
  }

  save() {
    this.setState({
      modalIsOpen:false
    }, this.props.save(this.props.time, this.state.name, this.state.phone))

  }

  render() {
    return(
      <div className={this.props.scheduled ? 'Filled' : 'Empty'}>
        <b className="time">{this.props.time}</b><br/><br/>
        {this.props.scheduled? <div>Name:{this.props.name}<br/>Phone:{this.props.phone}</div> : <i>Unscheduled</i>}
        <br/><br/>
        <button onClick={() => this.openModal()}>Edit</button>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <b className="time">{this.props.time}</b><br/><br/>
          Name: <input type='text' value={this.state.name} onChange={(e) => (this.setState({name:e.target.value}))}></input><br/>
          Phone: <input type='text' value={this.state.phone} onChange={(e) => (this.setState({phone:e.target.value}))}></input><br/>
          <button onClick={() => this.save()}>Save</button>
          <button onClick={() => this.closeModal()}>Cancel</button>
        </Modal>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
     super();
     this.state = {
        schedule: [
          {time:'9AM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'10AM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'11AM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'12PM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'1PM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'2PM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'3PM',
          name: '',
          phone: '',
          scheduled: false},
          {time:'4PM',
          name: '',
          phone: '',
          scheduled: false}
        ],
        count:0
     };
  }


  save(timee,namee,phonee) {
    let newarr = this.state.schedule.slice()
    newarr.map(item => {
      if (item.time===timee) {
        item.name = namee
        item.phone = phonee,
        item.scheduled = true
      }
    })

    this.setState({schedule:newarr,count:this.state.count+1})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Scheduler</h1>
          <i> Number of Scheduled Calls: {this.state.count} </i>
        </header>
        <div>
          {this.state.schedule.map(item => <Timeslot save={(time,name,phone) => this.save(time,name,phone)} time={item.time} scheduled={item.scheduled} name={item.name} phone={item.phone} />)}
        </div>
      </div>
    );
  }
}


export default App;
