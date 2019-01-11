import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      schedule: [
        {time: '9am',
         name: '',
         phone: '',
         scheduled: false},
         {time: '10am',
         name: '',
         phone: '',
         scheduled: false},
         {time: '11am',
          name: '',
          phone: '',
          scheduled: false},
          {time: '12pm',
          name: '',
          phone: '',
          scheduled: false},
          {time: '1pm',
           name: '',
           phone: '',
           scheduled: false},
           {time: '2pm',
           name: '',
           phone: '',
           scheduled: false},
           {time: '3pm',
            name: '',
            phone: '',
            scheduled: false},
            {time: '4pm',
            name: '',
            phone: '',
            scheduled: false},
      ],
      count: 0
    }
  }

  save(timee,namee,phonee) {
    let newarr = this.state.schedule.slice()
    newarr.map(item => {
      if (item.time === timee) {
        item.name = namee
        item.phone = phonee,
        item.scheduled = true
      }
    })
    this.setState({schedule:newarr, count:this.state.count+1})
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

Modal.setAppElement('#root')

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

class Timeslot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entername: "",
      enterphone: "",
      modalIsOpen: false,
    }
  this.openModal = this.openModal.bind(this);
  this.closeModal = this.closeModal.bind(this);
  };

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  save() {
    this.setState({
      modalIsOpen:false
    }, this.props.save(this.props.time, this.state.name, this.state.phone))
  }

    render() {
      return(
        <div className={this.props.scheduled ? "Filled" : "Empty"}>
          <b className="time">{this.props.time}</b><br/><br/>
          {this.props.scheduled ? <div>Name:{this.props.name}<br/>Phone:{this.props.phone}</div> : <i>Unscheduled</i>}
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
export default App;
