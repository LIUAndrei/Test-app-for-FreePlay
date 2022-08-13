class IndexedMap {

	constructor() {
		this.map = new Map();
		this.valuesArray = [];
	}

	set(key, value) {
		this.map.set(key, value);
		this.fillValuesArray();
	}

	get(key) {
		return this.map.get(key);
	}

	has(key) {
		return this.map.has(key)
	}

	remove(key) {
		this.map.delete(key);
		this.fillValuesArray();
	}

	getByIndex(index) {
		return this.valuesArray[index];
	}

	fillValuesArray() {
		this.valuesArray = [...this.map.values()];
	}

}

const indexedMap = new IndexedMap();

indexedMap.set("hello", 123);
indexedMap.set("apple", 777);
indexedMap.set(true, false);


console.log(indexedMap.get("apple"));
console.log(indexedMap.getByIndex(1));

indexedMap.remove("hello");

console.log(indexedMap.getByIndex(1));

