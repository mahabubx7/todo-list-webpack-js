/**
 * @jest-environment jsdom
 */

import '../__mocks__/mockHtml.js';
// import Renderer from '../libs/Renderer.js';
import Storage from '../libs/Storage.js';
import ToDo from '../libs/ToDo.js';

describe('Unit-test for add method', () => {
  const todo = new ToDo();
  todo.add('washing dishes');
  it('list length should be 1', () => {
    expect(todo.list.length).toBe(1);
  });
  it('the first item description should be matched', () => {
    expect(todo.list[0].description).toEqual('washing dishes');
  });
  it('list length should be 2', () => {
    todo.add('cook dinner');
    expect(todo.list.length).toBe(2);
  });
  it('the second item description should be matched', () => {
    expect(todo.list[1].description).toEqual('cook dinner');
  });
});

describe('Integration tests', () => {
  const todo = new ToDo();
  const storage = new Storage(todo);
  todo.add('washing plates');
  todo.add('laundry');
  todo.add('make dinner');
  todo.add('wash the car');
  storage.set(todo.list);
  it('list should be stored in localStorage', () => {
    expect(storage.get()).toEqual(todo.list);
  });
});
