/**
 * @jest-environment jsdom
 */

import '../__mocks__/mockHtml.js';
import Storage from '../libs/Storage.js';
import ToDo from '../libs/ToDo.js';

describe('Unit-test for add method', () => {
  const todo = new ToDo();
  const storage = new Storage('todo');
  storage.set([]); // reset initial list

  it('list length should be 1', () => {
    todo.add('washing dishes');
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

describe('Unit-test for remove method', () => {
  const todo = new ToDo();
  const storage = new Storage('todo');
  storage.set([]); // reset initial list
  todo.add('playing eFootball');
  todo.add('coding hobby projects');
  todo.add('reviewing codes');

  it('length should be decreased by remove', () => {
    todo.remove(2);
    expect(todo.list.length).toBe(2);
  });

  it('list should be updated', () => {
    expect(todo.list).toEqual([
      {
        index: 1,
        description: 'playing eFootball',
        completed: false,
      },
      {
        index: 2,
        description: 'reviewing codes',
        completed: false,
      },
    ]);
  });
});

describe('Integration tests ~ addItems', () => {
  const todo = new ToDo();
  todo.list = []; // reset
  todo.storage.set([]); // reset-localStorage

  it('list should be stored in localStorage', () => {
    todo.add('washing plates');
    todo.add('make dinner');
    todo.add('wash the car');
    expect(todo.storage.get().length).toEqual(3);
    expect(todo.storage.get()).toEqual(todo.list);
  });
});

// remove items
describe('Integration tests ~ removeItems', () => {
  const todo = new ToDo();
  todo.list = []; // reset
  todo.storage.set([]); // reset-localStorage
  // adding first
  todo.add('washing plates');
  todo.add('wash the car');

  it('first item should be removed', () => {
    todo.remove(2); // removed the last one
    expect(todo.list.length).toBe(1);
  });

  it('last item should be removed', () => {
    todo.remove(1); // removed the first one
    expect(todo.list.length).toBe(0);
    expect(todo.storage.get()).toEqual(todo.list);
    expect(todo.storage.get()).toEqual([]);
    expect(todo.list).toEqual([]);
  });
});
