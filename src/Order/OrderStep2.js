import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import OrderTabs from "./OrderTabs";
import styles from "./Order.module.css";

class OrderStep2 extends Component {
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
          selectedProductId,
          selectedOptions,
          setProductOption,
          selectedProductImg
      } = this.props;

      const product = this.props.products[selectedProductId];
      return this.state.submittedSuccessfully
          ? (<Redirect to="/order/3"/>)
          : (
              <div>
                  <OrderTabs cur="Exterior" selectedOptions={selectedOptions} product={product}
                             productImg={selectedProductImg}/>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                      {options.color.name}: <input onChange={setProductOption.bind(null, 'color')}/>
                      <div className={styles.orderFooter}>
                          <input type="submit" value="Next"/>
                      </div>
                  </form>
              </div>
          )
  }
}

OrderStep2.propTypes = {
  options: PropTypes.object.isRequired,
  selectedProductId: PropTypes.string
};

export default OrderStep2;
