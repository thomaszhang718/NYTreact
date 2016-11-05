// Include React 
var React = require('react');

var axios = require('axios');

var Main = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<div className="container">
				<div className="jumbotron">
					<h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
					<hr/>
					<p>
						<a href="#/Search"><button className="btn btn-primary btn-lg">Search Articles</button></a>
						<a href="#/Saved"><button className="btn btn-danger btn-lg">Saved Articles</button></a>
					</p>
				</div>

				<div className="row">
					
					{/*This code will dump the correct Child Component*/}
					{this.props.children}

				</div>

			</div>
		)
	}
});

// Export the componen back for use in other files
module.exports = Main;