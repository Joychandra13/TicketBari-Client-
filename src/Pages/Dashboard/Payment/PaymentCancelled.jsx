import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='title text-center '>Payment is cancelled. Please try again</h2>
            <Link to="/dashboard/my-booked-tickets">
            <button className='button mt-6'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;