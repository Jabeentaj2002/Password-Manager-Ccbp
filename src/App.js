import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    isShow: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchPassword = event => {
    this.setState({searchInput: event.target.value})
  }

  onShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput, isShow} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const initialBackgroundColor = colorList[Math.floor(Math.random() * 5)]

    const newListItem = {
      id: v4(),
      website: websiteInput,
      userName: usernameInput,
      password: passwordInput,
      initial: initial,
      initialBackgroundColor: initialBackgroundColor,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newListItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onDelete = id => {
    const {passwordsList} = this.state
    const newList = passwordsList.filter(eachItem => eachItem.id !== id)

    this.setState({passwordsList: newList})
  }

  renderPasswordSection = () => {
    const {passwordsList, isShow, searchInput} = this.state

    const newList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="password manager"
          />
          <p className="no-passwords">No Passwords</p>
        </div>
      )
    } else {
      return (
        <ul className="passwords-container">
          {newList.map(eachPassword => (
            <li className="list-item" key={eachPassword.id}>
              <div
                className={`initial-container ${eachPassword.initialBackgroundColor}`}
              >
                <p className="initial">{eachPassword.initial}</p>
              </div>
              <div className="details-container">
                <p className="website-text">{eachPassword.website}</p>
                <p className="username-text">{eachPassword.userName}</p>
                {isShow ? (
                  <p className="password-text">{eachPassword.password}</p>
                ) : (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                      className="stars"
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="delete-btn"
                data-testid="delete"
                onClick={() => this.onDelete(eachPassword.id)}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                  className="delete-img"
                />
              </button>
            </li>
          ))}
        </ul>
      )
    }
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
    } = this.state

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="inputs-output-container">
          <div className="inputs-inner-container">
            <h1 className="input-heading">Add New Password</h1>
            <form className="form-container" onSubmit={this.onAddPassword}>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="website-logo"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  className="website-input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </div>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="website-logo"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  className="website-input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserName}
                  value={usernameInput}
                />
              </div>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="website-logo"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  className="website-input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-img"
            alt="password manager"
          />
        </div>

        <div className="password-container">
          <div className="header">
            <div className="password-count">
              <h1 className="password-text">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search-bar">
              <div className="search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              className="checkbox-input"
              onChange={this.onShowPassword}
            />
            <label htmlFor="showPassword" className="label-text">
              Show Passwords
            </label>
          </div>
          {this.renderPasswordSection()}
        </div>
      </div>
    )
  }
}

export default App
