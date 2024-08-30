# Reservation System
This application has two part with front-end app created with Angular 17 and back-end app created with ASP.NET CORE.

## Installation
For Front-end application (Angular 17):

```bash
npm install --force
```

To run and build the application:
```bash
ng serve
```

For Back-end application (ASP.NET CORE using .NET CORE 8):

Run the application on Visual Studio as usual.

## Purpose of the application
The purpose of the application is to show the ability to create a web application using Angular and ASP.NET CORE. 
Therefore, this application does not represent a real system, meaning its business logics are not complex like those we see in a real reservation system like Agoda, Booking, etc.
In this ASP.NET CORE application, I specifically choose Dependency Injection as a design pattern to implement this server-side application.

## A work in progress
This application is a work in progress. Right now I only implemented a User Management in admin page. The other parts of the application will come out later.

Implemented functions:
- User Management (Admin) - it can add/delete/update/get users from/to the system.

Implementing functions:
- Login and Authorization features.
- Owner page for adding their accommodations/hotel.
- Owner page for showing which user reserved a room in their accommodations/hotel.
- Home page for doing a reservation (Member/Guest).

## License

[MIT](https://choosealicense.com/licenses/mit/)
