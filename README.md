# Application ToDo

Cette application ToDo permet de gérer une liste de tâches et de sous-tâches, avec des fonctionnalités d'authentification et de filtrage.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js : https://nodejs.org
- MySQL : https://www.mysql.com

## Installation

1. Clonez le dépôt GitHub :

git clone https://github.com/SmartPoster/todo_app.git


2. Accédez au répertoire du serveur :

cd server


3. Installez les dépendances du serveur :

npm install

4. Configurez la base de données :

- Assurez-vous que MySQL est en cours d'exécution sur votre machine.
- Créez une nouvelle base de données pour l'application ToDo.
- Modifiez le fichier `server/config/config.js` avec les informations de votre base de données.

5. Lancez le serveur :

npm start

6. Accédez au répertoire du client :

cd ../client

7. Installez les dépendances du client :

npm install

8. Lancez l'application cliente :

npm start

9. L'application ToDo devrait maintenant être accessible à l'adresse : http://localhost:3000

## Tests

Pour exécuter les tests de l'application, vous pouvez utiliser la commande suivante dans le répertoire du serveur :

Assurez-vous d'avoir configuré la base de données de test avant d'exécuter les tests.

## Contribuer

Toute contribution à l'application ToDo est la bienvenue ! Si vous souhaitez apporter des améliorations, veuillez ouvrir une issue ou soumettre une demande d'extraction (pull request).

## Licence

Cette application est sous licence MIT. Veuillez consulter le fichier `LICENSE` pour plus de détails.