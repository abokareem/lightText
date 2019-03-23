import React from 'react'

import {connect} from 'react-redux'
import {getAllUsersThunks} from '../store/allUsers'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchWord: '',
      hideResults: true
    }
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.getAllUsers()
  }
  handleBlur = event => {
    this.setState({
      hideResults: true
    })
  }
  handleChange = event => {
    this.setState({
      searchWord: event.target.value,
      hideResults: false
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          placeholder="Find a username"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          // value={this.props.allUsers}
        />

        <div
          className={this.state.hideResults ? 'hidden' : ''}
          style={{backgroundColor: '#ECECEC'}}
        >
          {this.props.allUsers
            .filter(item => {
              var re = new RegExp('^' + this.state.searchWord.toLowerCase())
              return re.test(item.username.toLowerCase())
            })
            .map(item => <p key={item.id}>{item.username}</p>)}
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {getAllUsers: () => dispatch(getAllUsersThunks())}
}

export default connect(mapState, mapDispatch)(SearchBar)
