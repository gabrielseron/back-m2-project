
# Project Challenge MT-4

Projet de fin d'année de MT-4


## Introduction
Ce projet a pour but de mettre en place le système d’évaluation des élèves de MT-4.

## Set-up
Nécessite node.js (et npm qui est inclut avec).

Clonez le repo, et à sa racine, créez et configurer un .env pour vous connecter à votre database :

```env
DB_HOST =
DB_USER =
DB_PASS =
DB_DATABASE =
PORTMYSQL =

JWT_KEY =
JWT_REFRESH_KEY =

NODEMAILEREMAIL = 
NODEMAILERPASS =

EMAIL_SECOURS = 
FRONT_URL = 
```

Installez node et ses modules :
```node
npm install 
```

Pour les windows, étape suplémentaire :
```node
npm install nodemon -g
```

Lancez le serveur ainsi :
```node
npm run watch
```
l’url ainsi que le port s’afficheront dans la console.
## Database
Clés primaires : id_promo, id_challenge, id_user, id_exercise.

Voici la structure de la base de donnée :

![alt text](https://cdn.discordapp.com/attachments/981548463206584320/996715764134453268/diagramme_3.png)

## Features
Voici ce que comprend ce projet :

- #### Inscription et connexion

Géré par un middleware et un controller, tous deux dédiés.
Lorsque l’élève s’inscrit, il doit également rensigner sa promotion, gérée par une autre paire de middleware + controllers dédiés.

 - #### Sécurité et gardes fou

Bien évidemment, on vérifie la validité de l’adresse E-mail renseignée, la correspondances des 2 mots de passe lors de l’inscription, et le token d’authentification envoyé par mail sert à activer le compte la 1ère fois.

- #### Promotions

L’élève doit la renseigner de bonne fois, néanmoins il lui est impossible d’en créer de nouvelles, seul le compte admin peu et doit donc les renseigner. 

 - #### Users & admins

On différencit les élèves des profs, considérant les élèves comme de simples users, et les profs comme des admins. C’est la variable booléenne “is_admin” qui définit si un user est admin ou non. 

- #### Les Challenges

Connexion aux instances des élèves via ssh, puis test de leurs instances et leurs configurations. Géré par une paire de controller + middleware dédiée. Plusieurs exercices par challenge, le résultat de chaque challenge est indépendant.

 - #### Le front-end

Un GUI simple à utiliser, en ionic.

- #### L’export excel

Possibilité d’exporter les résultats globaux d’un challenge en fichier excel depuis le front.

