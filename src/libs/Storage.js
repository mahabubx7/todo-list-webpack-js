export default class Storage {
  constructor(key = 'store') {
    this.key = key;
  }

  get() {
    return localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : null;
  }

  set(payload) {
    localStorage.setItem(this.key, JSON.stringify(payload));
  }
}
