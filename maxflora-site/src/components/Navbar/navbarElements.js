import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
  font-size: 1.5vw;
  font-family: 'Open Sans', Helvetica, sans-serif;
  background:rgb(0, 36, 8);
  display: flex;
  justify-content: space-between;
  padding: 2vw;
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`

export const NavLogo = styled.div`
  color:rgb(20, 133, 54);
  padding: 0 1vw;
  display: flex;
  align-items: center;
  white-space: nowrap;
`

export const NavLink = styled(Link)`
  color: #777777;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1vw;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #eeeeee;
  };
`
