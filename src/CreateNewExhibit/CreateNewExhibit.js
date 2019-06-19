import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './CreateNewExhibit.css';
import { Redirect } from 'react-router-dom';

class CreateNewExhibit extends Component {
  state = {
    name: '',
    artist: '',
    description: '',
    images: [],
    submitted: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //sending data to server
    return fetch('http://localhost:4567/exhibitions', {
      //without header body is empty. Cannot identify string
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      //check and edit data on server
      body: JSON.stringify({
        images: this.state.images,
        name: this.state.name,
        description: this.state.description,
        artist: this.state.artist,
        user: this.props.user
      })
    }).then(() => this.setState({ submitted: true }));
  };

  // https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  onDrop = (accepted, rejected) => {
    accepted.forEach(file => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState(state => ({
          images: [
            ...state.images,
            {
              name: file.name,
              image_base64: reader.result
            }
          ]
        }));
      });
      reader.readAsDataURL(file);
    });
  };

  render() {
    //if form submited redirect to the UserPage
    if (this.state.submitted) {
      return <Redirect to={`/artist/${this.props.user.name.replace(' ', '-')}`} />;
    }
    //connects to dropzone showing preview
    const { images } = this.state;
    const hasImages = images.length > 0;
    return (
      <div>
        <h1 className="title">Create New Exhibit</h1>
        <form className="create-form" onSubmit={this.handleSubmit}>
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
            <label className="name description-form">Description: </label>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="field-drop">
            <label className="dropzone">Upload Images: </label>
            <Dropzone maxSize={2000000} accept="image/jpeg, image/png" onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div {...getRootProps()} className="drop-zone">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p className="drop-zone-text">Drop files here...</p>
                    ) : (
                      <p className="drop-zone-text">
                        Drop images here, or click to select files to upload.
                      </p>
                    )}
                  </div>
                );
              }}
            </Dropzone>
            {hasImages && (
              <div className="wrap-preview">
                {images.map(image => (
                  <div
                    className="drop-zone-preview"
                    key={image.name}
                    style={{
                      backgroundImage: `url(${image.image_base64})`
                    }}
                    alt={image.name}
                  />
                ))}
              </div>
            )}
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateNewExhibit;
