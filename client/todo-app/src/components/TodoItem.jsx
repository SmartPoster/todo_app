import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const { id, title, status, subtasks } = todo;

  return (
    <div className="todo-item">
      <h3>{title}</h3>
      <p>Status: {status ? 'Done' : 'Not Done'}</p>
      <ul>
        {subtasks.map(subtask => (
          <li key={subtask.id} className={subtask.status ? 'done' : 'not-done'}>
            {subtask.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItem;