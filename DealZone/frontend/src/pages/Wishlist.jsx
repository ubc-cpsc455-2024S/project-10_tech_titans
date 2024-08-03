import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Card, CardContent, CardActions, Button, CardMedia } from '@mui/material';
import Navbar from '../components/Navbar';
import { getWishlistAsync, clearWishlistAsync, addToWishlistAsync, deleteFromWishlistAsync } from '../thunks/wishlistThunk';
import { addToCartAsync } from '../thunks/cartThunk';
import { truncateTitle } from '../utils/length';
import { useNavigate } from 'react-router-dom';
import '../css/Wishlist.css';

const WishlistPage = () => {
    const { items } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getWishlistAsync());
    }, []);

    const handleRemoveFromWishlist = (id) => {
        dispatch(deleteFromWishlistAsync(id));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlistAsync());
    };

    const handleMoveToCart = (item) => {
        dispatch(deleteFromWishlistAsync(item._id));
        dispatch(addToCartAsync(item));
    };

    const handleListingClick = (listing_id) => {
        navigate(`/listings/${listing_id}`);
    }

    const maxLength = 50;

    return (
        <>
            <Navbar />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Wishlist
                </Typography>
                <Grid container spacing={3}>

                    {items.map((item) => (
                        <Grid item key={item._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.image}
                                    alt={item.title}
                                    onClick={() => handleListingClick(item._id)}
                                    className="wishlist-img"
                                />
                                <CardContent className="wishlist-content" sx={{ flexGrow: 1 }} onClick={() => handleListingClick(item._id)}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {truncateTitle(item.title, maxLength)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
                                        ${item.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className="addToCartButton" size="small" color="primary" onClick={() => handleMoveToCart(item)}>
                                        Move to cart
                                    </Button>
                                    <Button className="deleteFromWishlistButton" size="small" color="secondary" onClick={() => handleRemoveFromWishlist(item._id)} >
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
                <Button className="clearWishlistButton" onClick={() => handleClearWishlist()}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '0.75rem 1.5rem',
                        marginTop: '1.5rem'
                    }}>Clear Wishlist</Button>
            </Container>
        </>
    );
};

export default WishlistPage;
