import { Nav, NavLink, NavLogo, NavMenu } from './navbarElements'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLogo>
                        Maxine Kampbell
                    </NavLogo>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/projects">
                        Projects
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
