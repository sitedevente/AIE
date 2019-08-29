# AIE

## PROJECT DESCRIPTION

Migration of the Real-Estate PHP project to Node js.
The goal was to create an efficient tool for customer wanting to 
rent or buy an estate thanks to a great sorting (search) system. 

In order to get multiple clients to communicate with the database safely,
it is intended to separate the UI from all data handling tasks so a REST Api and a (UI rendering) server for browser
as well as a smartphone app will be created as independent projects.

To respect the idea of security by design, all administration work (webmaster) shall be made 
simple enough for estate agency employees to handle.

Different actions, different actors, different clients.
(From a client -> Browser,Mobile App - Lambda user) 
(Another client -> Electron - Estate agency employee)

NOTE : This repository host the API part of the new project.

## API DEV STAGE

### Done Tasks (Tested with Postman) :

- Post an estate using Joi in express middleware and sequelize.
- Translate french into english code and database fields.
- 

### TO DO LIST:

- Design of Express Router for Visit hours and Clients API KEYs. 
- HTTPS immplementation (SSH or SSL).
- FTP server to handle images. 
- Varnish to cache requests.
- Process duplicating (one per processor).

