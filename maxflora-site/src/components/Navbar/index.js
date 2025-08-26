import { Nav, NavLink, NavLogo, NavMenu } from './navbarElements'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLogo>
                    Maxine Kampbell
                </NavLogo>
                <NavMenu>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/projects">
                        Projects
                    </NavLink>
                    <NavLink to="/contact">
                        Contact
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
