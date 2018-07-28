const localStorageMock = (() => {
	const storage = {};

	return {
		setItem: (key, value) => {
			storage[key] = value || "";
		},
		getItem(key) {
			return storage[key] || null;
		},
		removeItem: (key) => {
			delete storage[key];
		},
		getLength() {
			return Object.keys(storage).length;
		},
		key: (i) => {
			const keys = Object.keys(storage);
			return keys[i] || null;
		}
	};
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
