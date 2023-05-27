import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filterPriority, setFilterPriority] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByDate, setFilterByDate] = useState(false);

  useEffect(() => {
    // Récupérer les Todos depuis le serveur
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');

        // Mettre à jour l'état des Todos
        setTodos(response.data);
      } catch (error) {
        console.error('An error occurred while fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const filterTasksByPriority = () => {
    if (filterPriority === '') {
      // Si aucune priorité de filtrage n'est sélectionnée, retourner toutes les tâches
      return tasks;
    } else {
      // Sinon, filtrer les tâches en fonction de la priorité sélectionnée
      return tasks.filter(task => task.priority === filterPriority);
    }
  };
  const filterTasksPriority = filterTasksByPriority();  

  const filterTasks = () => {
    return tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const filteredTasks = filterTasks();

  const filterTasksByDate = () => {
    const currentDate = new Date();
    return tasks.filter(task => new Date(task.dueDate) > currentDate);
  };

  const filteredTasksDate = filterByDate ? filterTasksByDate() : tasks;


  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

    <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

    {/* Rendu des tâches filtrées */}
    {filteredTasks.map(task => (
    <TodoItem key={task.id} task={task} />
    ))}

    {/* Éléments d'interface utilisateur pour la sélection de la priorité de filtrage */}
    <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
      <option value="">Toutes les priorités</option>
      <option value="low">Faible</option>
      <option value="medium">Moyenne</option>
      <option value="high">Élevée</option>
    </select>

    {/* Rendu des tâches filtrées */}
    {filterTasksPriority.map(task => (
       <TodoItem key={task.id} task={task} />
    ))}

    <input type="checkbox" checked={filterByDate} onChange={() => setFilterByDate(!filterByDate)} />
    <label>Filter by date</label>

    {filteredTasksDate.map(task => (
        <TodoItem key={task.id} task={task} className={new Date(task.dueDate) > currentDate ? 'upcoming-task' : ''} />
    ))}
  
    </div>
  );
};

export default TodoList;

