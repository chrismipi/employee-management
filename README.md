# Employee Management

The application is just for managing employees, nothing fancy.

The front end uses REST to talk to the backend.

The app is broken down into: 

- Front end (Angular)
- Backend (Django)  
- Database (SQLite which is suitable for dev, for Prod any of these can be used: PostgreSQL, MySQL, MariaDB or any other Relational database)

## Frontend

Angular app using [Angular Material](https://material.angular.io) for styling.

The following command will start the frontend app:
`npm run start`

**Testing**

Karma + Jasmine.

The following command will run all the tests:

`npm run test`




## Backend

[Django](https://www.djangoproject.com)  + [Django Rest Framework](https://www.django-rest-framework.org) is the framework used.

The reason why it was chosen is because for our application, we are using standard operations for POST, PUT, GET and DELETE and [ModelSerializer](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer) provides all that functionality



## Deployment

For deploying the application, [Docker](https://github.com/docker/docker-ce) is used.

To start the application (frontend + backend) locally using [docker compose](https://docs.docker.com/compose/), run the following command:

`docker-compose up --build`



The application will be deployed using [Docker Swarm](https://docs.docker.com/engine/swarm/) and [CaddyServer](https://caddyserver.com) as the reverse proxy on this URL:

https://user-management.operadev.com

