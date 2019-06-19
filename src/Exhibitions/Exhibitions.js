import React, { Component } from "react";
import "./Exhibitions.css";
import axios from "axios";
import { Link } from "react-router-dom";
class Exhibitions extends Component {
  state = {
    exhibit_data: []
  };
  //display exhibits data
  exhibitData = () => {
    axios.get("http://localhost:4567").then(response => {
      const exhibits = response.data;
      this.setState({
        exhibit_data: exhibits
      });
    });
  };

  componentDidMount() {
    this.exhibitData();
  }
  render() {
    return (
      <div>
        <h1 className="title">Exhibits</h1>
        <div className="exhibits-container">
          {this.state.exhibit_data.map(exhibit => (
            <Link
              key={exhibit.id}
              className="item"
              id={exhibit.id}
              to={`/${exhibit.id}`}
            >
              {exhibit.images[0] && (
                <img
                  className="exhibitions"
                  src={exhibit.images[0].image_base64}
                  alt={exhibit.images[0].name}
                />
              )}
              <h3 className="exhibit-name">{exhibit.name}</h3>
              <h4 className="artist-name">{exhibit.artist}</h4>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Exhibitions;
