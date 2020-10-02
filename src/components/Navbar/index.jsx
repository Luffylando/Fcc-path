/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarStyle from './style';

const Navbar = () => (
	<NavbarStyle>
		<ul>
			<Link to="/">Home</Link>
		</ul>
	</NavbarStyle>
);

export default Navbar;
