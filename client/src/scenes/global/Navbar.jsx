import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
// import { setIsCartOpen } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className="">
      <Box
        className=""
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(0,255,255,0.8)"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
      >
        <Box
          className=""
          width="80%"
          // margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            className=""
            onClick={() => navigate("/")}
            sx={{
              "&:hover": { cursor: "pointer" },
            }}
            color={shades.secondary[600]}
          >
            RIDE RITE
          </Box>
          <Box
            className=""
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          >
            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <PersonOutline />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <ShoppingBagOutlined />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};
export default Navbar;
