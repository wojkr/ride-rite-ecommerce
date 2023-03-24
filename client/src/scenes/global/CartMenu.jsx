import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state/index";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";

const FlexBox = styled(Box)`
  display: flex;
  justifycontent: space-between;
  alignitems: center;
`;

const CartMenu = () => {
  //   const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isCartOpen } = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.attributes.price * item.count;
  }, 0);
  return (
    //   overlay
    <Collapse orientation="horizontal" in={isCartOpen}>
      <Box
        className="2"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        //   width={isCartOpen ? "500px" : "0"}
        height="100%"
        padding="20px"
        zIndex="10"
        backgroundColor="#01010122"
        overflow="auto"
      >
        {/* modal */}
        <Box
          position="fixed"
          top="0"
          right="0"
          width="max(400px,30%)"
          //   width={isCartOpen ? "500px" : "0"}
          height="100%"
          padding="30px"
          zIndex="100"
          backgroundColor={shades.neutral[100]}
        >
          <Box overflow="auto" height="100%">
            {/*header*/}
            <FlexBox mb="15px">
              <Typography flexGrow={1}>
                <h3>Shopping bag ({cart.length})</h3>
              </Typography>
              <IconButton onClick={() => dispatch(setIsCartOpen())}>
                <CloseIcon sx={{ width: "2.3rem" }} />
              </IconButton>
            </FlexBox>
            {/* CART LIST */}
            <Box>
              {cart.map((item) => {
                return (
                  <Box key={`${item.attributes.name}-${item.id}`}>
                    <FlexBox p="15px 0">
                      {/* ITEM IMAGE */}
                      <Box flex="1 1 40%">
                        <img
                          alt={item?.name}
                          width="123px"
                          height="164px"
                          src={`http:localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        />
                      </Box>

                      {/* ITEM NAME + REMOVE ICON */}
                      <Box flex="1 1 60%">
                        <FlexBox mb="5px">
                          <Typography fontWeight="bold">
                            {item.attributes.name}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              dispatch(removeFromCart({ id: item.id }))
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </FlexBox>
                        <Typography>
                          {item.attributes.shortDescription}
                        </Typography>

                        {/* INCREACE OR DECREACE ITEMS NUMBERS */}
                        <FlexBox>
                          <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[500]}`}
                          >
                            <IconButton
                              onClick={() =>
                                dispatch(decreaseCount({ id: item.id }))
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item.count}</Typography>
                            <IconButton
                              onClick={() =>
                                dispatch(increaseCount({ id: item.id }))
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          {/* PRICE */}
                          <Typography fontWeight="bold">
                            £{item.attributes.price}
                          </Typography>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
            {/* ACTIONS */}
            {cart.length !== 0 && (
              <Box m="20px 0">
                <FlexBox m="20px 0">
                  <Typography fontWeight="bold">SUBTOTAL:</Typography>
                  <Typography fontWeight="bold">{totalPrice}</Typography>
                </FlexBox>
                <Button
                  sx={{
                    backgroundColor: shades.primary[500],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                    "&:hover": {
                      backgroundColor: shades.secondary[500],
                      color: shades.primary[800],
                    },
                  }}
                  onCLick={() => {
                    navigate("/checkout");
                    dispatch(setIsCartOpen());
                  }}
                >
                  CHECKOUT
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
};

export default CartMenu;