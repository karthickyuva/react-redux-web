import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonToolbar, DropdownButton, NavDropdown, MenuItem, Navbar, Nav } from "react-bootstrap";
import UserThumbnail from "./UserThumbnail";

class Navigation extends Component {
	constructor() {
		super();
		this.state = {
			showInviteModal: false,
		};
	}

	closeInviteModal() {
		this.setState({ showInviteModal: false });
	}

	openInviteModal(e) {
		this.setState({ showInviteModal: true });
		e.preventDefault();
	}

	getNavigation() {
		return [
			{
				url: "/dashboard",
				title: "Dashboard"
			},
			{
				url: "/banner",
				title: "Banner"
			},
			{
				url: "#",
				title: "Sticker",
				subMenus: [
					{
						url: "/sticker/categories",
						title: "Category"
					},
					{
						url: "/sticker/subcategories",
						title: "Subcategory"
					},
					{
						url: "/sticker",
						title: "Sticker"
					},
				]
			},
			{
				url: "/children",
				title: "Children"
			},
			{
				url: "/photo",
				title: "Photo"
			},
			{
				url: "/user",
				title: "User"
			},
			{
				url: "/admin-user",
				title: "Admin User"
			},
		];
	}

	navList() {
		if (this.props.authenticated) {
			const title = <UserThumbnail />;

			const getUserEmail = localStorage.getItem("email");

			const currentPath = this.props.location;

			const navigationList = [];
			this.getNavigation().forEach((navigation, key) => {
				let isMenuActive = false;
				if (!navigation.subMenus) {
					if (currentPath === navigation.url) {
						isMenuActive = true;
					}
					navigationList.push(<li className={isMenuActive ? "active" : ""} key={key}><Link to={navigation.url}><span>{navigation.title}</span></Link></li>);
				} else {
					const subMenus = [];
					navigation.subMenus.forEach((subMenu, subMenuKey) => {
						if (currentPath === subMenu.url) {
							isMenuActive = true;
						}
						subMenus.push(<MenuItem className="headerSubNav" key={subMenuKey}><Link to={subMenu.url}> {subMenu.title}</Link></MenuItem>);
					});
					navigationList.push(<NavDropdown className="headerNavDropdown" key={key} active={isMenuActive} title={navigation.title}>{subMenus}</NavDropdown>);
				}
			});
			return (
				<div>
					<Navbar fixedTop fluid>
						<div className="container-fluid">
							<Navbar.Header>
								<Navbar.Brand>
									<Link className="navbar-brand" to="/dashboard">
										<img alt="Logo" title="React Redux" src="/img/logo.svg" />
									</Link>
								</Navbar.Brand>
								<Navbar.Toggle className="navbarToggle"/>
							</Navbar.Header>
							<Navbar.Collapse id="navigation" className="headerNavigation">
								<Nav>{navigationList}</Nav>
								<ul className="nav navbar-nav navbar-right hidden-xs hidden-sm">
									<ButtonToolbar>
										<DropdownButton title={title} id="dropdown-size-medium" style={{ background: "transparent", border: 0, boxShadow: "none" }}>
											<li>
												<div className="navbar-content">
													<div className="row">
														<div className="col-xs-4">
															<div className="profileImage">{title}</div>
														</div>
														<div className="col-xs-8">
															<p className="text-muted">{getUserEmail}</p>
														</div>
													</div>
												</div>
												<div className="navbarFooterDiv">
													<div className="navbar-footer">
														<div className="row">
															<Link to="/profile" className="btn btn-default btn-sm"><span className="glyphicon glyphicon-edit"></span> Edit Profile</Link>
															<Link to="/logout"><button className="btn btn-default btn-danger btn-sm pull-right"><span className="glyphicon glyphicon-off"></span> Logout</button></Link>
														</div>
													</div>
												</div>
											</li>
										</DropdownButton>
									</ButtonToolbar>
								</ul>
							</Navbar.Collapse>
						</div>
					</Navbar>
				</div>
			);
		}
	}

	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top navbarFixed">
				<div className="container-fluid">
					<Link className="navbar-brand loginDiv" to="/dashboard">
						<img alt="Logo" title="React Redux" src="/img/logo.svg" />
					</Link>
					{this.navList()}
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		role: state.auth.role
	};
}

export default connect(mapStateToProps)(Navigation);
