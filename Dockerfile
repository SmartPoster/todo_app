# Utilisez une image de base appropriée pour votre application
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers nécessaires dans le conteneur
COPY package.json package-lock.json /app/

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . /app

# Définissez l'environnement d'exécution
ENV PORT=8080

# Exposez le port sur lequel l'application s'exécute
EXPOSE $PORT

# Démarrez l'application
CMD ["npm", "start"]