import React, { FunctionComponent } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/esm/Container';

interface NavbarProps {
    
}
 
const Header: FunctionComponent<NavbarProps> = () => {
    return <Navbar bg="light" variant="light" className='borderBottomLight p-0'>
    <Container className="justifyContent">
      <a href="/">
        <Image width={'200px'} src='../spaceXLogo.png' alt='SpaceX'/>
      </a>
    </Container>
  </Navbar>;
}
 
export default Header;