import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reducer as notifications } from "react-notification-system-redux";
import Main from "./Main";

const actionCreators = Object.assign({}, notifications);

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
