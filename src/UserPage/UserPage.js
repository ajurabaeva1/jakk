import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

class UserPage extends Component {
  state = {
    myExhibits: []
  };

  componentDidMount() {
    const { name } = this.props.match.params;
    this.fetchUser(name);
  }

  //grab the Name of the User and set state with User Exhibits
  fetchUser = name => {
    fetch(`http://localhost:4567/users/by-name/${name}`)
      .then(response => response.json())
      .then(user => this.setState({ myExhibits: user.exhibits }))
      .catch(err => {
        console.error('Error fetching user: ', err);
      });
  };

  render() {
    return (
      <div className="main-userpage-container">
        <div className="userpage-container">
          <div className="btn-text-container">
            <div className="create-btn">
              <Link className="remove-style-dec" to="/create_exhibit">
                <h3 className="h3-create-exh">Add Exhibit</h3>
              </Link>
            </div>
          </div>
          <div className="user-exhibits">
            {this.state.myExhibits.length > 0 &&
              this.state.myExhibits.map(exhibit => (
                <Link
                  key={exhibit.id}
                  className="item user-exhibit user-exhibition"
                  id={exhibit.id}
                  to={`/${exhibit.id}`}
                >
                  {exhibit.images[0] && (
                    <img
                      className="all-exhibitions exhibitions"
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
      </div>
    );
  }
}

export default UserPage;
