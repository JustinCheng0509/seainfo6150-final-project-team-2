import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import TotalPrice from "./TotalPrice";
import OrderTabs from "./OrderTabs";
import styles from "./Order.module.css";
import Error from "../Error/Error";

class OrderStep5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedSuccessfully: false,
            billAddressSameAsShipment: false
        }
    }

    handleSubmit() {
        this.setState({
            submittedSuccessfully: true
        });
    }

    setBillAddress() {
        this.setState({
            billAddressSameAsShipment: !this.state.billAddressSameAsShipment
        })
    }

    render() {
        const {
            options,
            products,
            selectedOptions,
            selectedProductId,
            userInfo,
            setUserInfo,
            selectedProductImg
        } = this.props;

        const product = this.props.products[selectedProductId];
        return this.state.submittedSuccessfully
            ? (<Redirect to="/order/thank-you"/>)
            : (
                <div>
                    <OrderTabs cur="Payment" selectedOptions={selectedOptions} product={product}
                               productImg={selectedProductImg}/>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className={styles.paymentTab}>
                            <div className={styles.buyerInfo}>
                                <p>Payment Information</p>
                                <div>
                                    <input type="text" placeholder='Full Name'
                                           onChange={setUserInfo.bind(null, 'Full Name')} required/>
                                    <label>Full name: </label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Street'
                                           onChange={setUserInfo.bind(null, 'Shipment.Street')} required/>

                                    <label>Shipment address:</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='City'
                                           onChange={setUserInfo.bind(null, 'Shipment.City')} required/>
                                </div>
                                <div>
                                    <input type="text" placeholder='State'
                                           onChange={setUserInfo.bind(null, 'Shipment.State')} required/>
                                </div>
                                <div>
                                    <input type="text" placeholder='Zip Code'
                                           onChange={setUserInfo.bind(null, 'Shipment.Zip Code')} pattern='[0-9]{5}'
                                           required/>
                                </div>
                                <div>
                                    <input type="text" placeholder='Phone Number(format: 123-4567890)'
                                           onChange={setUserInfo.bind(null, 'Phone Number')} pattern='[0-9]{3}-[0-9]{7}'
                                           required/>
                                    <label>Phone number:</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Cell Number(format: 123-4567890)'
                                           onChange={setUserInfo.bind(null, 'Cell Number')} pattern='[0-9]{3}-[0-9]{7}'
                                           required/>
                                    <label>Cell number:</label>
                                </div>
                                <div>
                                    <input type="date" className={styles.calendar} max={new Date()}
                                           onChange={setUserInfo.bind(null, 'Birthday')} required/>
                                    <label>Date of birth:</label>
                                </div>
                                <p>Shipment Information</p>
                                <div>
                                    <div className={styles.billAddressCheckbox}>
                                        <input type="checkbox" onChange={this.setBillAddress.bind(this)}/>
                                        Same as shipping address
                                    </div>
                                    <label>Billing address:</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Street'
                                           disabled={this.state.billAddressSameAsShipment}
                                           onChange={setUserInfo.bind(null, 'Billing.Street')}
                                           value={this.state.billAddressSameAsShipment && userInfo ? userInfo["Shipment.Street"] : ""}
                                           required/>
                                </div>
                                <div>
                                    <input type="text" placeholder='City'
                                           disabled={this.state.billAddressSameAsShipment}
                                           onChange={setUserInfo.bind(null, 'Billing.City')}
                                           value={this.state.billAddressSameAsShipment && userInfo ? userInfo["Shipment.City"] : ""}
                                           required/>
                                </div>
                                <div>
                                    <input type="text" placeholder='State'
                                           disabled={this.state.billAddressSameAsShipment}
                                           onChange={setUserInfo.bind(null, 'Billing.State')}
                                           value={this.state.billAddressSameAsShipment && userInfo ? userInfo["Shipment.State"] : ""}
                                           required/>
                                </div>
                                <div>
                                    <input type="text" placeholder='Zip Code'
                                           disabled={this.state.billAddressSameAsShipment}
                                           onChange={setUserInfo.bind(null, 'Billing.Zip Code')} pattern='[0-9]{5}'
                                           value={this.state.billAddressSameAsShipment && userInfo ? userInfo["Shipment.Zip Code"] : ""}
                                           required/>
                                </div>
                            </div>
                            <div className={styles.summary}>
                                <div>

                                    <div className={styles.summaryImg}>
                                    <img src={selectedProductImg} alt='productImg'/>
                                    </div>
                                    <div className={styles.vehicleTitleInSummary}>
                                    {
                                        (product) ? "Your " + product.title : "No vehicle selected"
                                    }
                                    </div>

                                </div>
                                <div className={styles.summaryTitle}>
                                    Summary
                                </div>
                                <div>
                                {/*This will iterate through all the selected options so you can see what the user chose. */}
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
                                </div>
                                <div className={styles.summaryTitle}>
                                    Price
                                </div>
                                <TotalPrice
                                    options={options}
                                    selectedOptions={selectedOptions ? selectedOptions : {}}
                                    product={products[selectedProductId]}
                                />
                            </div>
                        </div>
                        <div className={styles.orderFooter}>
                            <input type="submit" value="Check Out"/>
                        </div>
                    </form>

                </div>
            )
    }
}

OrderStep5.propTypes = {
  options: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  selectedProductId: PropTypes.string
};

export default OrderStep5;
