# P.E.R.N. Stack Starter Pack

- This PostgreSQL, Express.js, React.js, Node.js starter pack is a starter pack for projects that use a relational database equipped with user authentication + authorization with JWT.

- Login + Register functionality comes by default, loading users into their user-specific dashboard by default.

## Notes for deploying to Heroku:

### Create Heroku Project

- `heroku login`
- `heroku create example-project-name`

### Configure PostgreSQL (if not already on Heroku Account)

- `heroku addons:create heroku-postgresql:hobby-dev -a example-project-name`
- `heroku pg:psql -a example-project-name`

## DEV ENVIRONMENT:

Backend (node, express) - in root, run: npm run dev
Frontend (react) - cd frontend, run: run start
