/* eslint-disable import/no-cycle */
import Task from './Task.js';
import Storage from './Storage.js';
import Renderer from './Renderer.js';

export default class ToDo {
  constructor() {
    this.storage = new Storage('todo');
    this.list = this.storage.get() || [];
    this.index = this.list.length > 0 ? this.list.length : 0;
    this.render = new Renderer('#list');
    this.syncUpdates();
  }

  serialize() {
    this.list.forEach((it, indx) => {
      it.index = indx + 1;
    });
  }

  syncUpdates() {
    this.serialize();
    this.storage.set(this.list);
    this.render.render();
  }

  toggleTask(index) {
    this.list.forEach((task) => {
      if (task.index === Number(index)) {
        task.completed = !task.completed;
      }
    });
    this.syncUpdates();
  }

  add(task) {
    const indexNumber = Number(this.index);
    this.list.push(new Task(task, indexNumber));
    this.syncUpdates();
  }

  update(id, desc) {
    const index = this.list.findIndex((task) => task.index === Number(id));
    this.list[index] = { ...this.list[index], description: desc };
    this.syncUpdates();
  }

  remove(index) {
    this.list = this.list.filter((it) => it.index !== Number(index));
    this.syncUpdates();
  }

  clearCompleted() {
    this.list = this.list.filter((it) => it.completed === false);
    this.syncUpdates();
  }

  refresh() {
    this.syncUpdates(); // storage reset
  }
}
