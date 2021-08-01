import React, { useState, useRef, useEffect } from 'react';
import './styles.css'

import { useParams, Link } from 'react-router-dom';
import { getCourseById, getMyCourses } from '../../services';

const IncorrectOTP = "Incorrect OTP, please try again";
const Success = "Payment Success. you can find this course on My Course on the dashboard";

const Payment = () => {

    const [cardNumber, setCardNumber] = useState();
    const [cardUserName, setUserName] = useState();
    const [cardCvv, setCvv] = useState()
    const [otp, setOtp] = useState()
    const [otpDisabled, setOtpDisabled] = useState(true)
    const [showForm, setShowForm] = useState(true)

    const [course, setCourse] = useState({})

    const [message, setMsg] = useState('');

    const form = useRef(null);
    let { id } = useParams();

    useEffect(() => {

        // check course is purchased
        if (getMyCourses().includes(id)) {
            setCourse({ title: "You have already purchased this course" })
            setShowForm(false)
        } else
            getCourseById(id).then(setCourse);
    }, []);

    const handleSubmit = () => {
        if (otp === "123456") {
            let myCourses = JSON.parse(localStorage.getItem('myCourses'));
            if (myCourses) myCourses.push(id);
            else myCourses = [id];
            localStorage.setItem('myCourses', JSON.stringify(myCourses));
            setMsg(Success)
            setShowForm(false)
        } else
            setMsg(IncorrectOTP)
    }

    const handleOTP = () => {
        if (form.current.reportValidity())
            setOtpDisabled(false)
    }

    return (
        <div className="paymentPage">
            <h2>{`Purchase : ${course.id || ''} - ${course.title}`}</h2>
            {
                showForm && course.id &&
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
            }
            {
                message &&
                <div className="msg">{message}</div>
            }
            <div><Link to="/dashboard">Go Back To DashBoard</Link></div>
        </div>
    );
}

export default Payment;