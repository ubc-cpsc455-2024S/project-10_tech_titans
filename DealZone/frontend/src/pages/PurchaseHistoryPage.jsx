import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseHistoryAsync } from '../thunks/purchaseHistoryThunk';
import Navbar from '../components/Navbar';
import PurchasedItem from '../components/PurchasedItem';
import '../css/PurchaseHistoryPage.css';

const PurchaseHistoryPage = () => {
    const dispatch = useDispatch();
    let purchaseHistoryItem = useSelector((state) => state.purchaseHistory.items);
    purchaseHistoryItem = JSON.parse(JSON.stringify(purchaseHistoryItem)).reverse();

    useEffect(() => {
        dispatch(getPurchaseHistoryAsync());
    }, []);

    return (
        <div>
            <Navbar />
            <div className="purchase-history-page">
                <h1>Purchase History</h1>
                <div className="purchase-history-list">
                    {purchaseHistoryItem.map(item => (
                        <PurchasedItem key={item._id} purchasedItem={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;
