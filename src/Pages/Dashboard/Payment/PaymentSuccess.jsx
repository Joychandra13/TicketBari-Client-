import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const PaymentSuccess = () => {
        const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxios();

    console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                    })
                })
        }

    }, [sessionId, axiosSecure])
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className="title">Payment successful</h2>
            <p className='subtitle'>Your TransactionId: {paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;