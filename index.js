const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== In-memory "database" =====
// You can later replace this with a real DB if needed.

let guardians = [
  { id: "G1", fullName: "Juan Pérez", phone: "8888-8888", address: "Downtown" },
  { id: "G2", fullName: "María López", phone: "7777-7777", address: "Uptown" }
];

let drivers = [
  { id: "D1", fullName: "Carlos Vargas", licenseNumber: "LIC-1234", phone: "8888-1111" },
  { id: "D2", fullName: "Ana Rodríguez", licenseNumber: "LIC-5678", phone: "8888-2222" }
];

let buses = [
  { id: "B1", plate: "ABC-123", capacity: 40 },
  { id: "B2", plate: "XYZ-456", capacity: 30 }
];

let routes = [
  { id: "R1", name: "Route 1", driverId: "D1", busId: "B1" },
  { id: "R2", name: "Route 2", driverId: "D2", busId: "B2" }
];

let students = [
  { id: "S1", fullName: "John Doe", grade: "6", guardianId: "G1", routeId: "R1" },
  { id: "S2", fullName: "Jane Smith", grade: "7", guardianId: "G2", routeId: "R2" }
];

let attendances = [
 
  {
     id: "A1",
     studentId: "S1",
     routeId: "R1",
     busId: "B1",
     date: "2025-12-13",
     status: "present"   
   }
];

// ===== Helpers =====
const genId = prefix => prefix + Math.random().toString(16).slice(2, 8);

// Generic CRUD helpers
function getAll(collection) {
  return (req, res) => res.json(collection);
}

function getOne(collection) {
  return (req, res) => {
    const item = collection.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  };
}

function deleteOne(collectionName) {
  return (req, res) => {
    const col = eval(collectionName); // simple for demo, not for production
    const index = col.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    const removed = col.splice(index, 1)[0];
    res.json(removed);
  };
}

// ===== Root / health =====
app.get("/", (req, res) => {
  res.json({ message: "SmartSchool REST API is running" });
});

// ======================================================
// GUARDIANS
// ======================================================

// GET all guardians
app.get("/guardians", (req, res) => res.json(guardians));

// GET guardian by id
app.get("/guardians/:id", getOne(guardians));

// POST create guardian
app.post("/guardians", (req, res) => {
  const { fullName, phone, address } = req.body;
  if (!fullName || !phone) {
    return res.status(400).json({ error: "fullName and phone are required" });
  }

  const guardian = {
    id: genId("G"),
    fullName,
    phone,
    address: address || ""
  };

  guardians.push(guardian);
  res.status(201).json(guardian);
});

// PUT update guardian
app.put("/guardians/:id", (req, res) => {
  const index = guardians.findIndex(g => g.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Guardian not found" });

  const { fullName, phone, address } = req.body;
  guardians[index] = {
    ...guardians[index],
    fullName: fullName ?? guardians[index].fullName,
    phone: phone ?? guardians[index].phone,
    address: address ?? guardians[index].address
  };
  res.json(guardians[index]);
});

// DELETE guardian
app.delete("/guardians/:id", deleteOne("guardians"));


// ======================================================
// DRIVERS
// ======================================================

app.get("/drivers", getAll(drivers));
app.get("/drivers/:id", getOne(drivers));

app.post("/drivers", (req, res) => {
  const { fullName, licenseNumber, phone } = req.body;
  if (!fullName || !licenseNumber) {
    return res.status(400).json({ error: "fullName and licenseNumber are required" });
  }

  const driver = {
    id: genId("D"),
    fullName,
    licenseNumber,
    phone: phone || ""
  };

  drivers.push(driver);
  res.status(201).json(driver);
});

app.put("/drivers/:id", (req, res) => {
  const index = drivers.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Driver not found" });

  const { fullName, licenseNumber, phone } = req.body;
  drivers[index] = {
    ...drivers[index],
    fullName: fullName ?? drivers[index].fullName,
    licenseNumber: licenseNumber ?? drivers[index].licenseNumber,
    phone: phone ?? drivers[index].phone
  };
  res.json(drivers[index]);
});

app.delete("/drivers/:id", deleteOne("drivers"));


// ======================================================
// BUSES
// ======================================================

app.get("/buses", getAll(buses));
app.get("/buses/:id", getOne(buses));

app.post("/buses", (req, res) => {
  const { plate, capacity } = req.body;
  if (!plate) {
    return res.status(400).json({ error: "plate is required" });
  }

  const bus = {
    id: genId("B"),
    plate,
    capacity: capacity ?? 0
  };

  buses.push(bus);
  res.status(201).json(bus);
});

app.put("/buses/:id", (req, res) => {
  const index = buses.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Bus not found" });

  const { plate, capacity } = req.body;
  buses[index] = {
    ...buses[index],
    plate: plate ?? buses[index].plate,
    capacity: capacity ?? buses[index].capacity
  };
  res.json(buses[index]);
});

app.delete("/buses/:id", deleteOne("buses"));


// ======================================================
// ROUTES
// ======================================================

app.get("/routes", getAll(routes));
app.get("/routes/:id", getOne(routes));

app.post("/routes", (req, res) => {
  const { name, driverId, busId } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const route = {
    id: genId("R"),
    name,
    driverId: driverId || "",
    busId: busId || ""
  };

  routes.push(route);
  res.status(201).json(route);
});

app.put("/routes/:id", (req, res) => {
  const index = routes.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Route not found" });

  const { name, driverId, busId } = req.body;
  routes[index] = {
    ...routes[index],
    name: name ?? routes[index].name,
    driverId: driverId ?? routes[index].driverId,
    busId: busId ?? routes[index].busId
  };
  res.json(routes[index]);
});

app.delete("/routes/:id", deleteOne("routes"));


// ======================================================
// STUDENTS
// ======================================================

app.get("/students", getAll(students));
app.get("/students/:id", getOne(students));

app.post("/students", (req, res) => {
  const { fullName, grade, guardianId, routeId } = req.body;
  if (!fullName || !grade) {
    return res.status(400).json({ error: "fullName and grade are required" });
  }

  const student = {
    id: genId("S"),
    fullName,
    grade,
    guardianId: guardianId || "",
    routeId: routeId || ""
  };

  students.push(student);
  res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const { fullName, grade, guardianId, routeId } = req.body;
  students[index] = {
    ...students[index],
    fullName: fullName ?? students[index].fullName,
    grade: grade ?? students[index].grade,
    guardianId: guardianId ?? students[index].guardianId,
    routeId: routeId ?? students[index].routeId
  };
  res.json(students[index]);
});

app.delete("/students/:id", deleteOne("students"));


// ======================================================
// ATTENDANCES
// ======================================================

app.get("/attendances", getAll(attendances));
app.get("/attendances/:id", getOne(attendances));

app.post("/attendances", (req, res) => {
  const { studentId, routeId, busId, date, status } = req.body;

  

  // Validaciones mínimas
  if (!studentId || !date || !status) {
    return res.status(400).json({
      error: "studentId, date and status are required"
    });
  }

  const attendance = {
    id: genId("A"),
    studentId,
    routeId: routeId || "",
    busId: busId || "",
    date,               
    status              
  };

  attendances.push(attendance);
  res.status(201).json(attendance);
});

app.put("/attendances/:id", (req, res) => {
  const index = attendances.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Attendance not found" });
  }

  const { studentId, routeId, busId, date, status } = req.body;

  attendances[index] = {
    ...attendances[index],
    studentId: studentId ?? attendances[index].studentId,
    routeId: routeId ?? attendances[index].routeId,
    busId: busId ?? attendances[index].busId,
    date: date ?? attendances[index].date,
    status: status ?? attendances[index].status
  };

  res.json(attendances[index]);
});

app.delete("/attendances/:id", deleteOne("attendances"));


// ===== Start server =====
app.listen(PORT, () => {
  console.log(`SmartSchool API running on port ${PORT}`);
});
