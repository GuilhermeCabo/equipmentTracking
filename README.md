# Equipment Tracking

### What is this repository for?

This is a Equipment Tracking module that allows customers to allocate construction equipment for their jobs

### How do I get set up?

- [Install Docker](https://docs.docker.com/engine/install/)

- Run the following command: `docker-compose up -d`

- Access in a browser the [API Docs](http://localhost:8000)

- If you want to take a look into the database directly, you can access the [Mongo Express Panel](http://localhost:8081). Default user is "admin" and default password is "12345"

- The list of equipments is automatically seeded into the database, but feel free to add more equipments to test the application

- This project contains unit tests for almost every file. If you want to run thoses tests, run `npm install && npm test`

## Basic Usage

### Listing Equipments

The endpoint that lists all equipments is `/equipments`, and it can take the following query params:

- name
- location
- status

The search doesn't need to be exact. For example, if you run `/equipments?name=for` you will receive the equipment "Fork" as one of the results

### Renting a Equipment (Checkout)

The endpoint that creates a "checkout" on a equipment is `/equipments/:equipmentId/checkout`, and it takes the following params:

params:

- equipmentId

body:

- jobId

Executing this endpoint will generate a new "checkout", and turn the status on the selected Equipment into "rented". Only equipments with status as "available" can be selected on a checkout.

### Returning a Equipment

The endpoint that returns a equipment and ends "checkouts" is `/equipments/:equipmentId/checkout/return`, and it takes the following params:

params:

- equipmentId

body:

- location

Executing this endpoint will return the equipment in the informed location and mark the checkout as "finished". Only rented equipments can be returned.
