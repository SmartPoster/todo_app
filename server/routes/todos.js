const express = require('express');
const router = express.Router();

router.get('/todos', (req, res) => {
  // Récupérer les Todos de l'utilisateur connecté depuis la base de données
  db.query('SELECT * FROM tasks WHERE userId = ?', [req.user.id], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des Todos :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des Todos' });
    } else {
      // Renvoyer les Todos dans la réponse
      res.json(results);
    }
  });
});

router.post('/todos', (req, res) => {
  // Récupérer les données de la nouvelle tâche (title, userId)
  const { title } = req.body;
  const userId = req.user.id;

  // Ajouter la nouvelle tâche dans la base de données
  db.query('INSERT INTO tasks (userId, title, status) VALUES (?, ?, 0)', [userId, title], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout de la nouvelle tâche :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout de la nouvelle tâche' });
    } else {
      const taskId = results.insertId;
      // Récupérer la tâche créée dans la base de données
      db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (queryError, queryResults) => {
        if (queryError) {
          console.error('Erreur lors de la récupération de la tâche créée :', queryError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la tâche créée' });
        } else {
          // Renvoyer la tâche créée dans la réponse
          res.json(queryResults[0]);
        }
      });
    }
  });
});

router.delete('/todos/:id', (req, res) => {
  // Récupérer l'ID de la tâche à supprimer depuis les paramètres de la requête
  const taskId = req.params.id;

  // Supprimer la tâche correspondante dans la base de données
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (error) => {
    if (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de la tâche' });
    } else {
      // Renvoyer une réponse indiquant le succès de la suppression
      res.json({ success: 'Tâche supprimée avec succès' });
    }
  });
});

router.put('/todos/:id', (req, res) => {
  // Récupérer l'ID de la tâche à mettre à jour depuis les paramètres de la requête
  const taskId = req.params.id;

  // Récupérer les nouvelles données de la tâche (title, status)
  const { title, status } = req.body;

  // Mettre à jour la tâche correspondante dans la base de données
  db.query('UPDATE tasks SET title = ?, status = ? WHERE id = ?', [title, status, taskId], (error) => {
    if (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de la tâche' });
    } else {
      // Récupérer la tâche mise à jour dans la base de données
      db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (queryError, queryResults) => {
        if (queryError) {
          console.error('Erreur lors de la récupération de la tâche mise à jour :', queryError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la tâche mise à jour' });
        } else {
          // Renvoyer la tâche mise à jour dans la réponse
          res.json(queryResults[0]);
        }
      });
    }
  });
});

router.post('/todos/:id/subtasks', (req, res) => {
  // Récupérer l'ID de la tâche parent depuis les paramètres de la requête
  const taskId = req.params.id;

  // Récupérer les données de la nouvelle sous-tâche (title, status)
  const { title, status } = req.body;

  // Ajouter la nouvelle sous-tâche à la tâche parent dans la base de données
  db.query('INSERT INTO subtasks (taskId, title, status) VALUES (?, ?, ?)', [taskId, title, status], (error) => {
    if (error) {
      console.error('Erreur lors de l\'ajout de la nouvelle sous-tâche :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout de la nouvelle sous-tâche' });
    } else {
      // Récupérer la tâche parent mise à jour dans la base de données
      db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (queryError, queryResults) => {
        if (queryError) {
          console.error('Erreur lors de la récupération de la tâche parent mise à jour :', queryError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la tâche parent mise à jour' });
        } else {
          // Renvoyer la tâche parent mise à jour dans la réponse
          res.json(queryResults[0]);
        }
      });
    }
  });
});

router.delete('/todos/:taskId/subtasks/:subtaskId', (req, res) => {
  // Récupérer l'ID de la tâche parent et l'ID de la sous-tâche depuis les paramètres de la requête
  const taskId = req.params.taskId;
  const subtaskId = req.params.subtaskId;

  // Supprimer la sous-tâche correspondante de la tâche parent dans la base de données
  db.query('DELETE FROM subtasks WHERE id = ? AND taskId = ?', [subtaskId, taskId], (error) => {
    if (error) {
      console.error('Erreur lors de la suppression de la sous-tâche :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de la sous-tâche' });
    } else {
      // Récupérer la tâche parent mise à jour dans la base de données
      db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (queryError, queryResults) => {
        if (queryError) {
          console.error('Erreur lors de la récupération de la tâche parent mise à jour :', queryError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la tâche parent mise à jour' });
        } else {
          // Renvoyer la tâche parent mise à jour dans la réponse
          res.json(queryResults[0]);
        }
      });
    }
  });
});

router.put('/todos/:taskId/subtasks/:subtaskId', (req, res) => {
  // Récupérer l'ID de la tâche parent et l'ID de la sous-tâche depuis les paramètres de la requête
  const taskId = req.params.taskId;
  const subtaskId = req.params.subtaskId;

  // Récupérer le nouveau statut de la sous-tâche depuis les données de la requête
  const { status } = req.body;

  // Mettre à jour le statut de la sous-tâche correspondante dans la base de données
  db.query('UPDATE subtasks SET status = ? WHERE id = ? AND taskId = ?', [status, subtaskId, taskId], (error) => {
    if (error) {
      console.error('Erreur lors de la mise à jour du statut de la sous-tâche :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du statut de la sous-tâche' });
    } else {
      // Récupérer la tâche parent mise à jour dans la base de données
      db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (queryError, queryResults) => {
        if (queryError) {
          console.error('Erreur lors de la récupération de la tâche parent mise à jour :', queryError);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la tâche parent mise à jour' });
        } else {
          // Renvoyer la tâche parent mise à jour dans la réponse
          res.json(queryResults[0]);
        }
      });
    }
  });
});

module.exports = router;
