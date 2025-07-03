class LocalDB {
  // Static method to set an item in localStorage
  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Static method to get an item from localStorage
  static getItem(key) {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  // Static method to remove an item from localStorage
  static removeItem(key) {
    localStorage.removeItem(key);
  }

  // Static method to clear all items from localStorage
  static clear() {
    localStorage.clear();
  }
}

export default LocalDB;