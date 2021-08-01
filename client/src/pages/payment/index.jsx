import React, { useState, useRef } from 'react';
import './styles.css'

import { useParams, Link } from 'react-router-dom';

const IncorrectOTP = "Incorrect OTP, please try again";
const Success = "Payment Success. you can find this course on My Course on the dashboard";

const Payment = () => {

    const [cardNumber, setCardNumber] = useState();
    const [cardUserName, setUserName] = useState();
    const [cardCvv, setCvv] = useState()
    const [otp, setOtp] = useState()
    const [otpDisabled, setOtpDisabled] = useState(true)

    const [message, setMsg] = useState('');

    const form = useRef(null);
    let { id } = useParams();

    const handleSubmit = () => {
        if(otp === "123456"){
            let myCourses = JSON.parse(localStorage.getItem('myCourses'));
            if(myCourses) myCourses.push(id);
            else myCourses = [id];
            localStorage.setItem('myCourses', JSON.stringify(myCourses));
            setMsg(Success)
        }else
            setMsg(IncorrectOTP)
    }
    const handleOTP = () => {
        setOtpDisabled(false)
    }

    return (
        <div className="paymentPage">
            <form ref={form}>
                <label htmlFor="number">Card Number</label>
                <input id="number" type="number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                <label htmlFor="name">Card User Name</label>
                <input id="name" type="text" value={cardUserName} onChange={e => setUserName(e.target.value)} required />
                <label htmlFor="cvv">Card CVV</label>
                <input id="cvv" type="text" value={cardCvv} onChange={e => setCvv(e.target.value)} required />
                <button type="button" onClick={handleOTP}>Get OTP</button>
                <label htmlFor="otp">Enter OTP</label>
                <input disabled={otpDisabled} id="otp" type="number" placeholder={`hint: 123456`} value={otp} onChange={e => setOtp(e.target.value)} required />
                <button type="button" disabled={otpDisabled} onClick={handleSubmit}>Submit</button>
            </form>
            {
                message &&
                <div className="msg">{message}</div>
            }
            <div><Link to="/dashboard">Go Back To DashBoard</Link></div>
        </div>
    );
}

export default Payment;