import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import Logout from "../Logout";
import { MemoryRouter } from "react-router";

function mockStore(state) {
	return {
		"default": () => {},
		subscribe: () => {},
		dispatch: () => {},
		getState: () => state,
		mapDispatchToProps: () => {},
		mapStateToProps: () => {}
	};
}

const store = mockStore({});

describe("Logout", () => {
	it("should display", () => {
		const component = renderer.create(
			<Provider store={store}>
				<MemoryRouter><Logout /></MemoryRouter>
			</Provider>
		);

		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
