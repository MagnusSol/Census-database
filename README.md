# Census Database API

A Node.js REST API for managing census participant data with authentication, built using Express and Sequelize.

## Features

- Basic Auth authentication
- CRUD operations
- Participant data includes personal details, work information, and home location
- Data validation
- MySQL database integration

## render.com

- URL for deployed app: https://census-database.onrender.com

## API Authentication

All endpoints require Basic Auth authentication:
- Username: `admin`
- Password: `P4ssword`

## Testing Endpoints in Postman

1. Authorize.

2. Available Endpoints:

#### Create Participant
- **POST** `https://census-database.onrender.com/participants/add`
```json raw example:
{
    "email": "john@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "dob": "1990-01-01",
    "companyname": "Tech Corp",
    "salary": 50000,
    "currency": "USD",
    "country": "USA",
    "city": "New York"
}
```

#### Get All Participants
- **GET** `https://census-database.onrender.com/participants`

#### Get Participant Details
- **GET** `https://census-database.onrender.com/participants/details/{email}`

#### Get Participant Work Details
- **GET** `https://census-database.onrender.com/work/{email}`

#### Get Participant Home Details
- **GET** `https://census-database.onrender.com/home/{email}`

#### Update Participant
- **PUT** `https://census-database.onrender.com/participants/{email}`
```json
{
    "email": "john@example.com",
    "firstname": "John",
    "lastname": "Smith",
    "dob": "1990-01-01",
    "companyname": "New Corp",
    "salary": 60000,
    "currency": "USD",
    "country": "USA",
    "city": "Boston"
}
```

#### Delete Participant
- **DELETE** `https://census-database.onrender.com/participants/{email}`

## Data Validation

The API validates:
- Email format
- Date format (YYYY-MM-DD)
- Required fields (firstname, lastname, companyname, salary, currency, country, city)


Required environment variables in `.env`:

PORT=3000
DB_HOST=mysql-5c88fa9-studmag-census-app.c.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=AVNS_OnpYHACKvoj3_AQ-sc4
DB_NAME=defaultdb
DB_PORT=15181