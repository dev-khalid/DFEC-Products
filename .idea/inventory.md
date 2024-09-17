Plans
-----
* Initially I will treat inventory-server and inventory-ui as 2 separate services. Once I introduce another new service, like Auth service, I will make this a monorepo.
* For docker-compose run health check of Redis & Mysql.
* Push images to GHCR on code-push.
* Run unit-tests.
* Run automated code-quality tests.

Following services:
* inventory-server
* inventory-ui

Data Stores: 
- Redis
- MySql

Tasks:
- [x] Introduce Swagger
- [x] Class validator
- [ ] Category CRUD