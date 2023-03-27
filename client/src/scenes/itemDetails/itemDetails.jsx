import {
  FavoriteBorderOutlined,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";
import { Box, Typography, Button, useTheme, IconButton } from "@mui/material";
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  ShoppingBagOutlined as BagIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../state";
import { shades } from "../../theme";

const ItemDetails = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [lastItemId, setLastItemId] = useState(0);
  // console.log(name);
  // const {
  //   data: {
  //     attributes: {
  //       formats: {
  //         medium: { url },
  //       },
  //     },
  //   },
  // } = image;

  const getItem = async () => {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  };
  const getItems = async () => {
    const items = await fetch(
      `http://localhost:1337/api/items?fields[0]=name`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setLastItemId(itemsJson.data[itemsJson.data?.length - 1].id);
    setItems(itemsJson.data);
  };

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);
  return (
    <Box width="80%" margin="80px auto">
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        columnGap="clamp(10px,20px,40px)"
      >
        {/* IMAGE */}
        <Box maxWidth="500px">
          <img
            src={`http://localhost:1337${item?.attributes.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.name}
            // width="300px"
            // height="400px"
            maxWidth="500px"
            style={{ objectFit: "contain", overflow: "hidden" }}
          />
        </Box>
        {/* TEXT */}
        <Box>
          {/* NAVIGATION */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              <Link to="/">Home</Link>
              /Item
            </Typography>
            <Box>
              {itemId > 1 && (
                <Button onClick={() => navigate(`/item/${Number(itemId) - 1}`)}>
                  Prev
                </Button>
              )}
              {itemId != lastItemId && (
                <Button onClick={() => navigate(`/item/${Number(itemId) + 1}`)}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
          {/* TITLE AND DESCRIPTION */}
          <Box>
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>£{item?.attributes?.price}</Typography>
            <Typography variant="subtitle1" mb="1rem">
              {item?.attributes?.shortDescription}
            </Typography>
            {/* COUNT AND ADD TO CART BTN */}
            <Box display="flex" justifyContent="flex-end" mb="1rem">
              <Box
                display="flex"
                alignItems="center"
                // backgroundColor={shades.neutral[200]}
                borderRadius="3px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography
                  color={shades.primary[400]}
                  width="1rem"
                  textAlign="center"
                >
                  {count}
                </Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              {/* BUTTON */}
              <Button
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
                sx={{
                  marginLeft: "10px",
                  backgroundColor: shades.primary[400],
                  color: "white",
                  "&:hover": { backgroundColor: shades.primary[500] },
                }}
              >
                {" "}
                Add to Cart <BagIcon />
              </Button>
            </Box>
          </Box>
          {/* HEART ICON AND CATEGORY */}
          <Box textAlign="right">
            <Typography>
              <FavoriteBorderOutlined /> ADD TO WISHLIST
            </Typography>
            {item?.attributes?.category && (
              <Typography>
                CATEGORIES:{" "}
                <Link to="/?topRated">
                  {item?.attributes?.category
                    ?.replace(/([A-Z])/g, " $1")
                    ?.replace(/^./g, (str) => str.toUpperCase())}
                </Link>
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {/* TABS */}
      {/* <Box className="" width="80%" margin="80px auto">
        <Typography variant="h2" textAlign="center">
          Our Feaetured <b>Products</b>
        </Typography>
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            sx: { display: isNonMobile ? "block" : "none" },
          }}
          sx={{
            m: "25px",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab label="ALL" value="all" />
          <Tab label="NEW ARRIVALS" value="newArrival" />
          <Tab label="BEST SELLERS" value="bestSeller" />
          <Tab label="TOP RATED" value="topRated" />
        </Tabs>
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill,300px)"
          justifyContent="space-around"
          rowGap="20px"
        >
          {value === "all" &&
            items.map((item) => (
              <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
            ))}
          {value === "newArrival" &&
            newArrival.map((item) => (
              <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
            ))}
          {value === "bestSeller" &&
            bestSeller.map((item) => (
              <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
            ))}
          {value === "topRated" &&
            topRated.map((item) => (
              <Item key={`${item.name}-${item.id}`} item={item} width="300px" />
            ))}
        </Box>
      </Box> */}
    </Box>
  );
};
export default ItemDetails;
