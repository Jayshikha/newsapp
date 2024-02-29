import React, { Component } from 'react'
import PropTypes from 'prop-types'
import loader from "./loader.gif"
export default class Spinner extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className='text-center'>
        <img src={loader} alt="loading" />
      </div>
    )
  }
}
