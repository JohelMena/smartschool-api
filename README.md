# SmartSchool REST API

REST API for the **SmartSchool Transport** mobile application.  
The API exposes CRUD endpoints for the main entities of the system:

- Students
- Guardians
- Routes
- Drivers
- Buses

It is deployed in the cloud and will be tested using **Postman**.

---

## 📡 Base URLs

- **Local:** `http://localhost:3000`
- **Cloud (Production):** `https://smartschool-api-zh5d.onrender.com`

---

## 🛠 Technology

- Runtime: **Node.js**
- Framework: **Express**
- CORS enabled
- Data is stored **in-memory** (arrays) for simplicity  
  > Every time the server restarts, the data is reset.

---

## ▶️ How to run locally

Requirements: Node.js and npm installed.


git clone https://github.com/<your-user>/smartschool-api.git
cd smartschool-api
npm install
npm run dev      # or: npm start
The API will be available at: http://localhost:3000

🔍 Health check
GET /
Returns a simple JSON message to verify that the API is running.

Example response

json
Copiar código
{
  "message": "SmartSchool REST API is running"
}
👨‍🎓 Students
Entity example:

json
Copiar código
{
  "id": "S1",
  "fullName": "John Doe",
  "grade": "6",
  "guardianId": "G1",
  "routeId": "R1"
}
GET /students
Returns all students.

Response 200

json
Copiar código
[
  {
    "id": "S1",
    "fullName": "John Doe",
    "grade": "6",
    "guardianId": "G1",
    "routeId": "R1"
  }
]
GET /students/{id}
Returns a single student by id.

Path parameter: id (e.g. /students/S1)

Response 200

json
Copiar código
{
  "id": "S1",
  "fullName": "John Doe",
  "grade": "6",
  "guardianId": "G1",
  "routeId": "R1"
}
Response 404

json
Copiar código
{ "error": "Not found" }
POST /students
Creates a new student.

Request body (JSON)

json
Copiar código
{
  "fullName": "Alice Example",
  "grade": "8",
  "guardianId": "G1",
  "routeId": "R2"
}
Required fields:

fullName

grade

Response 201

json
Copiar código
{
  "id": "Sabc123",
  "fullName": "Alice Example",
  "grade": "8",
  "guardianId": "G1",
  "routeId": "R2"
}
Response 400

json
Copiar código
{ "error": "fullName and grade are required" }
PUT /students/{id}
Updates an existing student.
Only the fields sent in the body are updated.

Request body (example)

json
Copiar código
{
  "fullName": "Alice Updated",
  "grade": "9"
}
Response 200

json
Copiar código
{
  "id": "Sabc123",
  "fullName": "Alice Updated",
  "grade": "9",
  "guardianId": "G1",
  "routeId": "R2"
}
Response 404

json
Copiar código
{ "error": "Student not found" }
DELETE /students/{id}
Deletes a student by id.

Response 200

json
Copiar código
{
  "id": "Sabc123",
  "fullName": "Alice Updated",
  "grade": "9",
  "guardianId": "G1",
  "routeId": "R2"
}
Response 404

json
Copiar código
{ "error": "Not found" }
👨‍👩‍👧 Guardians
Entity example:

json
Copiar código
{
  "id": "G1",
  "fullName": "Juan Pérez",
  "phone": "8888-8888",
  "address": "Downtown"
}
GET /guardians
Returns all guardians.

GET /guardians/{id}
Returns a guardian by id.

POST /guardians
Creates a new guardian.

Request body

json
Copiar código
{
  "fullName": "Juan Pérez",
  "phone": "8888-8888",
  "address": "Downtown"
}
Required: fullName, phone.

Response 201

json
Copiar código
{
  "id": "Gabc12",
  "fullName": "Juan Pérez",
  "phone": "8888-8888",
  "address": "Downtown"
}
PUT /guardians/{id}
Updates an existing guardian.

Request body (example)

json
Copiar código
{
  "phone": "8888-9999",
  "address": "New address"
}
DELETE /guardians/{id}
Deletes a guardian by id.

🧑‍✈️ Drivers
Entity example:

json
Copiar código
{
  "id": "D1",
  "fullName": "Carlos Vargas",
  "licenseNumber": "LIC-1234",
  "phone": "8888-1111"
}
GET /drivers
Returns all drivers.

GET /drivers/{id}
Returns a driver by id.

POST /drivers
Creates a new driver.

Request body

json
Copiar código
{
  "fullName": "Carlos Vargas",
  "licenseNumber": "LIC-1234",
  "phone": "8888-1111"
}
Required: fullName, licenseNumber.

PUT /drivers/{id}
Updates an existing driver.

DELETE /drivers/{id}
Deletes a driver by id.

🚌 Buses
Entity example:

json
Copiar código
{
  "id": "B1",
  "plate": "ABC-123",
  "capacity": 40
}
GET /buses
Returns all buses.

GET /buses/{id}
Returns a bus by id.

POST /buses
Creates a new bus.

Request body

json
Copiar código
{
  "plate": "ABC-123",
  "capacity": 40
}
Required: plate (capacity is optional, default 0).

PUT /buses/{id}
Updates an existing bus.

DELETE /buses/{id}
Deletes a bus by id.

🚍 Routes
Entity example:

json
Copiar código
{
  "id": "R1",
  "name": "Route 1",
  "driverId": "D1",
  "busId": "B1"
}
GET /routes
Returns all routes.

GET /routes/{id}
Returns a route by id.

POST /routes
Creates a new route.

Request body

json
Copiar código
{
  "name": "Route 1",
  "driverId": "D1",
  "busId": "B1"
}
Required: name.
driverId and busId are optional but should reference valid drivers/buses in a real scenario.

PUT /routes/{id}
Updates an existing route.

Request body (example)

json
Copiar código
{
  "name": "Route 1 - Updated",
  "driverId": "D2"
}
DELETE /routes/{id}
Deletes a route by id.

✅ Notes for testing with Postman
Set Content-Type: application/json for all POST and PUT requests.

You can use either:

Local URL: http://localhost:3000

Cloud URL: https://smartschool-api-zh5d.onrender.com

Data is stored in memory, so it will reset every time the server restarts.

