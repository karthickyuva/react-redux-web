import React from "react";
import { ButtonToolbar, DropdownButton, MenuItem, Button } from "react-bootstrap";

class PageHeader extends React.Component {
	render() {
		return (
			<div>
				<div className="home-page">
					<div className="banner">
						<div className="container">
							<h1 className="logo-font">React Redux</h1>
							<p>A place to share your knowledge.</p>
						</div>
					</div>
				</div>
				<h3 className="pageHeader">
					{this.props.title}
					{
						!this.props.hideButton && !this.props.saveButton &&
						<div className="list-pageHeader headerButton">
							{this.props.showAddButton &&
							<Button bsStyle="primary" className="headerBtnAdd" onClick={this.props.onAdd}><span className="glyphicon glyphicon-plus"></span> {this.props.addButton}</Button>
							}
							{
								this.props.showDownloadButton &&
								<ButtonToolbar>
									<DropdownButton title={<span className="glyphicon-download-alt downloadButton">Download As</span>} bsStyle="success" pullRight id="dropdown-size-medium">
										<MenuItem eventKey="1">CSV</MenuItem>
										<MenuItem eventKey="2">XML</MenuItem>
										<MenuItem eventKey="2">JSON</MenuItem>
									</DropdownButton>
								</ButtonToolbar>

							}
							{
								this.props.showDeleteButton &&
								<div className="pull-right pageHeaderDelBtn">
									<Button disabled={this.props.disableBulkButton} bsStyle="danger" onClick={this.props.bulkDeleteAction} id="dropdown-size-medium"><span className="glyphicon glyphicon-trash"></span> Delete</Button>
								</div>
							}
						</div>
					}

				</h3>
			</div>
		);
	}
}

module.exports = PageHeader;
