/* eslint-disable import/no-cycle */
import Behaviors from './Behaviors.js';
import Storage from './Storage.js';

export default class Renderer {
  constructor(selector = '#test') {
    this.selector = selector;
    this.element = document.querySelector(this.selector);
    this.syncUpdates();
    this.render();
  }

  syncUpdates(payload = []) {
    this.list = new Storage('todo').get() || payload;
  }

  // eslint-disable-next-line class-methods-use-this
  serialUpdates() {
    const updated = [];
    const currentList = document.querySelectorAll('#list li');
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const it in currentList) {
      updated.push(this.list[Number(currentList[it].dataset?.index)]);
    }
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in updated) {
      const indx = i + 1;
      updated[i].index = indx;
    }
    new Storage('todo').set(updated);
  }

  render() {
    this.syncUpdates();
    this.element.innerHTML = ''; // reset old content
    if (this.list && this.list.length > 0) {
      this.list.forEach((it) => {
        const item = document.createElement('li');
        item.dataset.index = it.index;
        item.draggable = true;
        item.innerHTML = `
        <input type="checkbox" ${it.completed ? 'checked' : ''}>
        <span class="${it.completed ? 'completed' : ''}">${it.description}</span>
        <button class="option"><i class="ri-more-2-fill"></i></button>
        <button class="btn-delete hidden" data-index="${it.index}"><i class="ri-delete-bin-line"></i></button>
        `;
        item.addEventListener('change', (event) => Behaviors.toggle(event));
        item.addEventListener('dblclick', () => {
          item.querySelector('span').contentEditable = true;
          item.classList.add('edit');
          item.querySelector('span').focus();
          const del = item.querySelector('.btn-delete');
          item.querySelector('.option').classList.add('hidden');
          del.classList.remove('hidden');
          del.addEventListener('click', (event) => Behaviors.delete(event));
        });
        item.querySelector('span').addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            Behaviors.edit(event);
            event.target.removeAttribute('contentEditable');
            item.querySelector('.option').classList.remove('hidden');
            item.classList.remove('edit');
          }
        });
        this.element.appendChild(item); // updating DOM content
        const itemList = document.querySelectorAll('#list li');
        itemList.forEach((it) => {
          it.addEventListener('dragstart', () => setTimeout(() => it.classList.add('dragging'), 0));
          it.addEventListener('dragend', () => it.classList.remove('dragging'));
        });

        this.element.addEventListener('dragover', (event) => {
          event.preventDefault();
          const draggingItems = this.element.querySelector('li.dragging');
          const siblings = [...this.element.querySelectorAll('li:not(.dragging)')];
          const nextSibling = siblings.find((sibling) => {
            const { offsetTop, offsetHeight } = sibling;
            return event.clientY <= offsetTop + offsetHeight / 2;
          });
          this.element.insertBefore(draggingItems, nextSibling);
        }, true);
        this.element.addEventListener('dragenter', (event) => event.preventDefault());
        this.element.addEventListener('drop', () => {
          this.serialUpdates();
        });
      });
    } else {
      this.element.innerHTML = '<li>List is empty!</li>';
    }
  }
}
