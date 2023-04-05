/**
 * @jest-environment jsdom
 */

import '../__mocks__/mockHtml.js';
// import Renderer from '../libs/Renderer.js';
// import Storage from '../libs/Storage.js';
import ToDo from '../libs/ToDo.js';

describe('Tests for add/remove feature', () => {
  const todo = new ToDo();

  it('should add an item to ToDo-list', () => {
    todo.add('washing dishes');
    expect(todo.list.length).toBe(1);
  });
});
