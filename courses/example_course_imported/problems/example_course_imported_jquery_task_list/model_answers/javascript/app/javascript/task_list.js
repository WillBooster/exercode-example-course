import $ from 'jquery';

export function initializeTaskList() {
  const $taskTitle = $('#task-title');

  $('#add-task').on('click', () => {
    const title = String($taskTitle.val()).trim();
    if (title === '') return;

    $('<li>').text(title).appendTo('#task-list');
    $taskTitle.val('');
  });
}
