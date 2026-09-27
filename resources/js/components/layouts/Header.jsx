import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Link, } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'
import { authorize, } from "../../redux/actions/authActions"
import { getCart, } from "../../redux/actions/cartActions"

export default function Header(props) {
  const state = useSelector(state => ({
    auth: state.auth,
    cart: state.cart,
  }))
  const dispatch = useDispatch()
  const [cartCount, setCartCount] = useState(0)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const [navMenuAnchor, setNavMenuAnchor] = useState(null)

  useEffect(() => {
    if (
      !state.cart.loading &&
      typeof state.cart.data === "object" &&
      null !== state.cart.data
    ) {
      const quantity = state.cart.data.data.reduce((acc, curr) => acc + curr.quantity, 0)
      setCartCount(quantity)
    }
  }, [state.cart.data])

  useEffect(() => {
    dispatch(authorize())
    dispatch(getCart())
  }, [])

  const openUserMenu = e => setUserMenuAnchor(e.currentTarget)
  const closeUserMenu = () => setUserMenuAnchor(null)
  const openNavMenu = e => setNavMenuAnchor(e.currentTarget)
  const closeNavMenu = () => setNavMenuAnchor(null)

  const renderAuthLinks = () => {
    if (state.auth.data) {
      return <>
        <IconButton onClick={openUserMenu} color="inherit">
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={closeUserMenu}
        >
          <MenuItem component={Link} to="/user/account" onClick={closeUserMenu}>
            Account
          </MenuItem>
          <MenuItem component={Link} to="/orders" onClick={closeUserMenu}>
            My Orders
          </MenuItem>
          <MenuItem component={Link} to="/user/logout" onClick={closeUserMenu}>
            Logout
          </MenuItem>
        </Menu>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </>
    }
    return <>
      <Button component={Link} to="/user/login" color="inherit">
        Login
      </Button>
      <Button component={Link} to="/user/register" color="inherit">
        Register
      </Button>
      <IconButton component={Link} to="/cart" color="inherit">
        <Badge badgeContent={0} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  }

  return (
    <AppBar position="static" color="primary" sx={{ mb: 4, }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 1, display: { xs: 'inline-flex', sm: 'none', }, }}
          onClick={openNavMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={navMenuAnchor}
          open={Boolean(navMenuAnchor)}
          onClose={closeNavMenu}
        >
          <MenuItem component={Link} to="/" onClick={closeNavMenu}>Home</MenuItem>
          <MenuItem component={Link} to="/books/search" onClick={closeNavMenu}>Search Books</MenuItem>
        </Menu>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 600, }}
        >
          Book Store Management System 2
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex', }, alignItems: 'center', }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/books/search" color="inherit">Search Books</Button>
        </Box>
        {renderAuthLinks()}
      </Toolbar>
    </AppBar>
  )
}
