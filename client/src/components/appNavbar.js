import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class AppNavbar extends React.Component{
    state = {
        isOpen: false
    }
    toggle = () => this.setState({isOpen: !this.state.isOpen})
    
    render(){
        return(
            <div>
                <Navbar color='dark' dark expand='sm' className='mb-5'>
                <NavbarBrand >TBK</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar >
                    <Nav className='ml-auto' navbar >
                        <NavItem>
                            <NavLink href="/">My Lists</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">LogOut</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}