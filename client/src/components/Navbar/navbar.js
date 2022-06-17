import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/styles";
import Logout from "../Logout";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Link,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
} from "@mui/material";

const drawerWidth = 240;
const navItems = ["About"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isAuthenticated } = useContext(UserContext);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const useStyles = makeStyles((theme) => ({
    MuiToolbar: {
      "@media (min-width: 600px)": {
        minHeight: "10px !important",
      },
    },
    LogoMobile: {
      my: 2,
      textDecoration: "none",
    },
    LogoNavbar: {
      flexGrow: 1,
      display: {
        xs: "none",
        sm: "block",
        fontSize: 24,
        color: "#fff",
        textDecoration: "none",
      },
    },
  }));
  const classes = useStyles();
  const NavbarLogo = () => {
    if (isAuthenticated) {
      return (
        <Link
          href="/home"
          variant="h6"
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block",
              fontSize: 24,
              color: "#fff",
              textDecoration: "none",
            },
          }}
        >
          YMajor
        </Link>
      );
    } else {
      return (
        <Link
          href="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block",
              fontSize: 24,
              color: "#fff",
              textDecoration: "none",
            },
          }}
        >
          YMajor
        </Link>
      );
    }
  };

  const DrawerLogo = () => {
    if (isAuthenticated) {
      return (
        <Link
          href="/home"
          variant="h6"
          sx={{ my: 2, textDecoration: "none", fontSize: 16 }}
        >
          YMajor
        </Link>
      );
    } else {
      return (
        <Link
          href="/"
          variant="h6"
          sx={{ color: "black", my: 2, textDecoration: "none", fontSize: 16 }}
        >
          YMajor
        </Link>
      );
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <DrawerLogo />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ background: "#00356b", maxHeight: 40 }}>
        <Toolbar className={classes.MuiToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <NavbarLogo />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
            <Logout />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
