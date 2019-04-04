import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

import TotalPrice from "./TotalPrice";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedSuccessfully: false
    }
  }

  handleSubmit() {
    this.setState({
      submittedSuccessfully: true
    });
  }

  render() {
    const {
      options,
      products,
      selectedOptions,
      selectedProductId,
      userInfo
    } = this.props;

    return this.state.submittedSuccessfully
      ? (<Redirect to="/order/thank-you" />)
      : (
      <form onSubmit={this.handleSubmit.bind(this)}>

        {/* This will iterate through all the selected options so you can see what the user chose. */}
        <ul>
        {
          Object.keys(selectedOptions).map((option) => {
            const originalOption = options[option];
            const selectedValue = selectedOptions[option];

            return (
                <li key={option}>{originalOption.name}: {selectedValue}</li>
            );
          })
        }
        </ul>

        {/* This will iterate through all the user info so you can see what the user entered. */}
        <ul>
            {
                userInfo?
                    Object.keys(userInfo).map((info) => (
                        <li key={info}>{info}: {userInfo[info]}</li>
                    )) : ""
            }
        </ul>

        <TotalPrice
          options={options}
          selectedOptions={selectedOptions}
          product={products[selectedProductId]}
        />

        <fieldset>
          <input type="submit" value="Submit order" />
        </fieldset>
      </form>
    )
  }
}

Summary.propTypes = {
  options: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  selectedProductId: PropTypes.string
};

export default Summary;
