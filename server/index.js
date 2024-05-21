import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

//========================DATABASE CONNECTION=======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
//========================END OF DATABASE CONNECTION=======================

//========================API TO FETCH TO DATA=======================
app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data);
  });
});
//========================END OF API TO FETCH TO DATA=======================

//======================== API TO POST TO DATA=======================
app.post("/create", (req, res) => {
  const sql = "INSERT INTO users (firstname, lastname, email) VALUES (?)";

  const values = [req.body.firstname, req.body.lastname, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data);
  });
});


//======================== API TO UPDATE TO DATA=======================
app.put("/update/:id", (req, res) => {
  const sql = "UPDATE users set firstname = ?, lastname = ?, email = ? WHERE id = ?";

  const values = [req.body.firstname, req.body.lastname, req.body.email];

  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data);
  });
});

// app.get('/getrecord/:id', (req, res) =>{
//   const id = req.params.id;
//   const sql = "SELECT * FROM `users' where id = ?"
//   db.query(sql, [id], (err, data) => {
//     if (err) {
//       return res.json({ Error: "Error" });
//     }
//     return res.json(data);
//   });
// })


app.get("/getit/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM users where id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    return res.json(data);
  });
});
//========================END OF API TO UPDATE TO DATA=======================

//========================API TO DELETE FROM DATA=======================
app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM `users` WHERE `users`.`id` = ?";

  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    }
    
    return res.json(data);
  });
});



//========================END OF API TO DELETE FROM DATA=======================
app.listen(3000, () => {
  console.log("server running");
});
