import React, { Component } from 'react';
import EditExhibit from '../EditExhibit/EditExhibit';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Exhibit.css';

class Exhibit extends Component {
  state = {
    exhibit: {}
  };

  //grab data by id
  fetchExhibit = () => {
    const { id } = this.props.match.params;
    fetch(`http://localhost:4567/exhibitions/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          exhibit: data
        });
      });
  };

  componentDidMount() {
    this.fetchExhibit();
  }
  // changes redirect to true and go to editPage component
  handleClick = () => {
    this.setState({ redirected: true });
  };

  //delete button
  handleDelete = async event => {
    event.preventDefault();
    let answer = window.confirm('Are you sure you want to delete?');
    if (answer === true) {
      window.location.href = 'http://localhost:3000';
      console.log(true);

      let deleteInfo = {
        images: this.state.images,
        name: this.state.name,
        description: this.state.description,
        artist: this.state.artist
      };

      axios
        .delete(`http://localhost:4567/exhibitions/${this.props.match.params.id}`, deleteInfo)
        .then(res => console.log(res.data));
    } else {
      window.location.href = '/';
    }
  };
  render() {
    if (this.state.redirected) {
      return (
        <Redirect
          push
          to={{
            pathname: `/update_exhibit/${this.props.match.params.id}`,
            state: { exhibitToUpdate: this.props.match.params.id }
          }}
        />
      );
    }
    const { name, artist, description, images, user } = this.state.exhibit;
    const isEditable = this.props.user && user && this.props.user.uniqueId === user.google_id;
    return (
      <div className="exhibit-container">
        {this.state.exhibit ? (
          <div>
            <div className="main-data-block">
              <div>
                {images && images.length > 0 && (
                  <img className="main-image" src={images[0].image_base64} alt={name} />
                )}
              </div>
              <div className="text-container">
                <h2 className="exhibit-h2">{name}</h2>
                <h3 className="artist">{artist}</h3>
                <p className="description">{description}</p>
              </div>
            </div>
            {isEditable && (
              <div className="exhibit-controls">
                <button className="exhibit-control" type="button" onClick={this.handleDelete}>
                  Delete
                </button>
                <button className="exhibit-control" type="button" onClick={this.handleClick}>
                  Edit
                </button>
              </div>
            )}

            <h2 className="gallery-title">Gallery</h2>
            {images &&
              images.map(img => (
                <img className="gallery-images" src={img.image_base64} alt={name} />
              ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Exhibit;
