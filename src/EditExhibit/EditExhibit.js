import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class EditExhibit extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      updated: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleEdit = async event => {
    event.preventDefault();

    console.log(event.target);
    let answer = window.confirm('Are you sure you want to edit?');

    if (answer === true) {
      window.location.href = '/';
      console.log(true);

      let editInfo = {
        images: this.state.images,
        name: this.state.name,
        description: this.state.description,
        artist: this.state.artist
      };
      console.log(editInfo);
      axios
        .put(
          `http://localhost:4567/exhibitions/${this.props.location.state.exhibitToUpdate}`,
          editInfo
        )
        .then(res => console.log(res.data));
    } else {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.updated === true) {
      window.location.reload();
      return <Redirect to="/images" />;
    }
    return (
      <div className="editExhibit">
        <h2 className="title">Edit Exhibit</h2>
        <form onChange={this.handleChange} onSubmit={this.handleEdit} id="changeForm">
          <div className="field">
            <label className="name">Exhibit Name: </label>
            <input
              type="text"
              placeholder="Exhibit Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label className="name">Artist Name: </label>
            <input
              type="text"
              placeholder="Artist Name"
              name="artist"
              value={this.state.artist}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label className="name">Description: </label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <button value="Submit" className="submit-btn" onClick={this.handleEdit}>
            Edit Exhibit
          </button>
        </form>
      </div>
    );
  }
}

export default EditExhibit;
