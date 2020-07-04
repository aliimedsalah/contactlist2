import React, { Component } from 'react';
import Card from './components/card';
import axios from 'axios';
import './App.css';
import AddContact from './components/AddContact';

class App extends Component {
  state = {
    contactes: [],
    show: false,
  };
  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  componentDidMount() {
    this.getAllContactes();
  }
  getAllContactes = () =>
    axios.get('/contactes').then((res) => {
      this.setState({
        contactes: res.data,
      });
    });
  handleAdd = (newContact) =>
    axios.post('/add_contacte', newContact).then(this.getAllContactes());

  handleDelete = (id) =>
    axios.delete(`/delete_contacte/${id}`).then(this.getAllContactes());
  handleEdit = (contact) =>
    axios
      .put(`/edit_contacte/${contact.id}`, {
        name: contact.name,
        mail: contact.mail,
        tel: contact.tel,
      })
      .then(this.getAllContactes());
  render() {
    return (
      <div className='App'>
        <div className='title'>
          <h1>
            <span style={{ color: '#ff9f43' }}>Con</span>
            <span style={{ color: '#0abde3' }}>ta</span>
            <span style={{ color: '#ee5253' }}>ct-</span>
            <span style={{ color: '#00d2d3' }}>Li</span>
            <span style={{ color: '#5f27cd' }}>st</span>
          </h1>
        </div>
        <AddContact
          show={this.state.show}
          handleShow={this.handleShow}
          handleAdd={this.handleAdd}
        />
        <div className='w'>
          {this.state.contactes.map((el, i) => (
            <Card
              key={i}
              person={el}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;