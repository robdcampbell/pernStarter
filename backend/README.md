# Database setup:

- App connects to a PostgrSQL database. (SEE: database.sql)
- Database must have uuid-ossd extension:
  -- psql command: create extension if not exists "uuid-ossp";
