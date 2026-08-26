import $ from 'jquery';
import { beforeEach, describe, expect, test } from 'vitest';

import { initializeTaskList } from '../app/javascript/task_list.js';

beforeEach(() => {
  document.body.innerHTML = `
    <input id="task-title" type="text">
    <button id="add-task" type="button">追加</button>
    <ul id="task-list"></ul>
  `;
  initializeTaskList();
});

describe('initializeTaskList', () => {
  test('adds the entered task to the list', () => {
    $('#task-title').val('買い物に行く');

    $('#add-task').trigger('click');

    expect($('#task-list li')).toHaveLength(1);
    expect($('#task-list li').text()).toBe('買い物に行く');
  });

  test('appends multiple tasks in order', () => {
    $('#task-title').val('資料を読む');
    $('#add-task').trigger('click');
    $('#task-title').val('メモを書く');
    $('#add-task').trigger('click');

    expect(
      $('#task-list li')
        .toArray()
        .map((element) => $(element).text()),
    ).toEqual(['資料を読む', 'メモを書く']);
    expect($('#task-title').val()).toBe('');
  });

  test('ignores an input containing only whitespace', () => {
    $('#task-title').val('   ');

    $('#add-task').trigger('click');

    expect($('#task-list li')).toHaveLength(0);
  });

  test('renders the task as text instead of HTML', () => {
    $('#task-title').val('<strong>重要</strong>');

    $('#add-task').trigger('click');

    expect($('#task-list li').text()).toBe('<strong>重要</strong>');
    expect($('#task-list strong')).toHaveLength(0);
  });
});
