# Motorway Backend

## Overview
Given vehicles table which has the data of cars that Motorway has sold in the past, or is in the process of selling. The vehicle's current state is defined in the state field. The state defines the lifecycle of a vehicle, from quoted to selling and sold.
The stateLogs table has the history of each vehicle's state transitions, from the moment it was created with the quoted state, to the most recent state transition.
We have to build an API with Node.js that, based on a vehicle id and a timestamp, returns a vehicle's information and the vehicle's state on the given timestamp. 

## Technologies Used
- Nodejs 
- Express
- PostgreSQL
- Jest
- Docker
- Typescript

## Setup Instructions
1. Install latest node and npm.
2. Run the APIs: Change to root of the project and run `docker-compose up`

## Testing 
To run tests, use the following command:

- ```npm i```
- ```npm test```

To run load testing, use following command:

- ```npm run load_test```

To clean the build of the project (dist/) run:

-  ```npm run clean```

## Examples 

## Get list of Things

### Request

`GET /health_check/`

    curl -i -H 'Accept: application/json'  localhost:3000/healthcheck

### Response

    ```{
    "success": true,
    "status": 200,
    "data": {
        "name": "motorway-takehome-backend",
        "version": "1.0.0"
    }
}```

## Get vehicle state at timestamp

### Request

`POST /vehicle/{vehicleId}/state-at-timestamp?timestamp={timestampWithTimezone}`

    curl -i -H 'Accept: application/json' localhost:3000/vehicle/3/state-at-timestamp?timestamp=2022-09-11T10:00:00

### Response

    ```{
    "success": true,
    "status": 200,
    "data": {
        "state": "quoted",
        "timestamp": "2022-09-11T09:11:45.000Z",
        "vehicleid": 3,
        "make": "VW",
        "model": "GOLF"
    }
}```