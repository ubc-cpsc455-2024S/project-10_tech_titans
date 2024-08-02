import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import '../css/IndividualListingPage.css';
import { addToWishlistAsync } from '../thunks/wishlistThunk';
import { addToCartAsync } from '../thunks/cartThunk';
import { useParams } from 'react-router-dom';
import { getIndividualListingAsync } from '../thunks/postsListThunk';
import { Modal, Typography, Button, Paper, CircularProgress, Box } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';

export const IndividualListingPage = ({ post }) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const cartError = useSelector(state => state.cart.error);
    const [open, setOpen] = useState(false);
    let items = useSelector(state => state.individualPost.item);
    const loading = useSelector(state => state.individualPost.loading);
    if (post) {
        items = [post];
    }

    useEffect(() => {
        dispatch(getIndividualListingAsync(productId));
    }, [dispatch, productId]);

    const handleAddToCart = (item) => {
        if (!isLoggedIn) {
            setOpen(true);
            return;
        }
        dispatch(addToCartAsync(item));
    };

    const handleAddToWishlist = (item) => {
        if (!isLoggedIn) {
            setOpen(true);
            return;
        }
        dispatch(addToWishlistAsync(item));
    };

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleClose = () => setOpen(false);

    return (
        <>
            <Navbar />
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                    <Typography ml={2}>Loading...</Typography>
                </Box>
            ) : ( 
                <>
                {items.map((item) => (
                <div className="product-container" key={item._id}>
                    <div className="product-image-container">
                        <img src={item.image} alt="Item" />
                        {item.tags && item.tags.length > 0 && (
                            <div className="product-tags"> 
                                {item.tags.map((tag, index) => (
                                    <label key={index}>{tag}</label>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="product-details-container">
                        <h2 className='product-name'>{item.title}</h2>
                        <h3 className="product-price">${item.price}</h3>
                        <p className="product-description">
                            {item.description}
                        </p>
                        {!item.sold && <>
                            <button
                                className='add-to-cart-button'
                                onClick={() => handleAddToCart(item)}
                            >
                                Add to Cart
                            </button>
                            {cartError && <p className="error-message">{cartError}</p>}
                            <button
                                className='add-to-wishlist-button'
                                onClick={() => handleAddToWishlist(item)}
                            >
                                Add to Wishlist
                            </button>
                        </>}
                    </div>
                </div>
                ))}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="login-required-title"
                    aria-describedby="login-required-description"
                >
                    <Paper sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center'
                    }}>
                        <Typography id="login-required-title" variant="h5" component="h2" gutterBottom>
                            Login Required
                        </Typography>
                        <Typography id="login-required-description" sx={{ mt: 2, mb: 3 }}>
                            Please login or sign up to continue.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                            sx={{ width: '100%' }}
                        >
                            Okay
                        </Button>
                    </Paper>
                </Modal>
                </>
            )}
        </>
    );
};
