# Boat butler solution
This is the proposed solution for the Wiredelta Boatbutler code challenge. 
The solution is a REST API for a fictive service "Boatbutler" where users can create job ads for getting their boats fixed, 
and boat fixing companies can create proposals for those job ads. 
Ideally, each microservice should be stored in their own repository but for easily viewing and running the solution they have all been gathered in this one repository. 

## How to run
Each microservice has been containerized for easily running the project in any environment. 
To run the project: 
- Git clone the project: `git clone git@github.com:sasp1/wiredelta-codechallenge.git`
- Paste .env file in each microservice with private keys for authentication and cloud database access.
- Spin up each MS in terminal with command: `docker-compose up --build`
- Navigate to: `localhost:3000/api` Here, the API information is available and all API routes can be executed
- Authenticate with API: `/auth/login` and if wanted, use the example text for each route. 

## Architecture
The solution is built with a microservice architecture, dividing each service into its own microservice.
Each microservice has been containerized with Docker and Docker-compose file has been created to easily spin up the project in any environment. 
Each microservice has its own repository and can be developed completely independent of the other services which makes the project a lot more scalable.
In total, 4 microservices has been built to host the different functionality of the system: 
- `Boatbutler` The externally facing REST API, which hosts the gateway for external communication
- `auth-ms` MS responsible for authentication. Has `users` and `roles` database. 
- `job-management-ms` MS responsible for everything related to job ads and job proposals.
- `account-management-ms` MS responsible for non-sensitive user account and company data. 

Internally, the microservices communicate with each other with Redis message queue.  
Additionally, a NPM library has been created that all microservices implement which facilitates the authentication (read next section).

## Storage
Non-SQL database MongoDB has been chosen for data storage. 
Furthermore, it has been chosen to use cloud version of MongoDB with MongoDB Atlas 
and the private password for the database is stored in .env files in each microservice. 

## Security
In order for the system to be secure a json web token based authentication system has been implemented. 
The authentication server `auth-ms` is responsible for granting the json web token to users upon login. 
The token is signed with a private RSA key only accessible on the authentication server, which has an expiry duration of 1 hour.
The token certifies a certain user with a user id and a particular role. The following roles have been implemented: 
- `standard` This role is for regular users who can only create and view job ads and proposals from companies. 
- `company-owner` This role is for users who own companies. Company owners can view job ads of users and create and view proposals
- `admin` This role is meant for developers testing the system. The admin role has access to all resources.

Users of the API can then use this token in future requests to authenticate themselves. 
To easily verify the token, each microservice implements an NPM library that periodically fetches the public key from the authentication server. 
With this key, each microservice can verify the token and each be responsible to authorize the user. 

##Future improvements
The solution has some obvious improvements that could be made to further enhance the solution. 
###Testing
With NestJS a framework for testing is set up and dependency injection comes out of the box. 
An obvious next step would be to implement proper E2E tests for the entire project. 
This could be a completely separate module only responsible for testing the entire project. 
Integration and unit tests should also be implemented for each microservice and here communication with other MS could be mocked 
which would make sure tests could be run easy and fast. 
### Development of the rest of the solution 
Of course, the functionality in this project is only part of the entire solution that the customer wants to be implemented. 
The rest of the solution could easily be implemented by further adding functionality and tests to each MS. 

##TLDR
Containerized microservice architecture based solution. Json web token for authorization on separate authentication server with public/private key encryption. 
Separate NPM library developed for periodically fetching public key from authentication server to allow each MS to authenticate incoming requests.
For data storage cloud database MongoDB Atlas has been chosen. Each microservice connects to the same cluster but hosts and communicates with different databases in that cluster. 
