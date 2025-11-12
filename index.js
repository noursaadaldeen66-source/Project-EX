const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(logger);
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
// let students = [
//   {
//     id: 101,
//     name: "أحمد",
//     grades: { math: 95, science: 88, arabic: 92 },
//   },
//   {
//     id: 102,
//     name: "سارة",
//     grades: { math: 85, science: 90, arabic: 97 },
//   },
//   {
//     id: 103,
//     name: "يوسف",
//     grades: { math: 78, science: 82, arabic: 80 },
//   },
//   {
//     id: 104,
//     name: "فاطمة",
//     grades: { math: 99, science: 95, arabic: 94 },
//   },
// ];
// let Hastory = [];

// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// app.put("/api/students/:id", (req, res) => {
//   const studentId = parseInt(req.params.id);

//   const newData = req.body;

//   const studentIndex = students.findIndex(
//     (student) => student.id === studentId
//   );

//   if (studentIndex === -1) {
//     return res.status(404).json({ message: "Student not found" });
//   }

//   students[studentIndex] = { id: studentId, ...newData };

//   res.json(students[studentIndex]);
// });

// app.get("/api/Hastory", (req, res) => {
//   res.json(Hastory);
// });

// app.post("/api/sum", (req, res) => {
//   const n1 = req.body.n1;
//   const or = req.body.or;
//   const n2 = req.body.n2;
//   let result = n1 + n2;
//   Hastory.push(`{${n1} ${or} ${n2} = ${result}}`);
//   res.json(`${n1} ${or} ${n2} = ${result}`);
// });

/////////////////////////////

let owners = [];
let animals = [];
let ownerId = 1;
let animalId = 1;

app.post("/api/Owner", (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  const newOwner = {
    id: ownerId++,
    email,
    name,
  };

  owners.push(newOwner);
  res.status(201).json(newOwner);
  res.send("Add Owner");
});

app.post("/api/animal/:owner_ID", (req, res) => {
  const ownerId = parseInt(req.params.owner_ID);
  const { dateofbirth, name } = req.body;

  if (!dateofbirth || !name) {
    return res.status(400).json({ error: "dateofbirth and name are required" });
  }

  const owner = owners.find((o) => o.id === ownerId);
  if (!owner) {
    return res.status(400).json({ error: "Owner not found" });
  }

  const newAnimal = {
    id: animalId++,
    dateofbirth,
    name,
    owner: ownerId,
  };
  animals.push(newAnimal);
  res.send("Add Animal");
  res.status(200).json(newAnimal);
});

app.get("/api/Owner/:Owner_ID", (req, res) => {
  const ownerId = parseInt(req.params.Owner_ID);

  const owner = owners.filter((o) => o.id == ownerId);

  if (!owner) {
    return res.status(404).json({ error: "Owner not found" });
  }
  return res.status(200).json(owner);
});

//animal id
app.get("/api/animal/:animal_ID", (req, res) => {
  const animalId = parseInt(req.params.animal_ID);

  const animal = animals.find((animal) => animal.id == animalId);
  if (!animal) {
    return res.status(404).json({ error: "Animal not found" });
  }
  return res.status(200).json(animal);
});

app.patch("/api/animal/:id", (req, res) => {
  const animalID = parseInt(req.params.id);
  const updates = req.body;

  if ("name" in updates || "dateofbirth" in updates) {
    return res.status(400).json({ error: "Cannot change name or dateofbirth" });
  }

  const animalindex = animals.findIndex((a) => a.id === animalID);
  if (animalindex === -1) {
    return res.status(404).json({ error: "animal not found" });
  }

  animals[animalindex] = {
    ...animals[animalindex],
    ...updates,
  };

  res.json(animals[animalindex]);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
