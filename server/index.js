const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Tüm origin'lerden gelen isteklere izin ver
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "x",
  database: "proje",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "we need token please provide it." });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication error" });
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
};

app.post("/register", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err, result) => {
      if (err) {
        res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/forgot-password", (req, res) => {
  const email = req.body.email;

  con.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        return res.send("Kullanıcı bulunamadı.");
      } else {
        const newPassword = crypto.randomBytes(20).toString("hex");

        con.query(
          "UPDATE users SET password = ? WHERE email = ?",
          [newPassword, email],
          (error, results) => {
            if (error) throw error;

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "imyobitirme@gmail.com",
                pass: "x",
              },
            });

            const mailOptions = {
              from: "imyobitirme@gmail.com",
              to: email,
              subject: "Parola Sıfırlama İsteği",
              text: "Yeni şifreniz: " + newPassword,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) throw error;

              res.send("E-posta gönderildi");
            });
          }
        );
      }
    }
  );
});

app.put("/update-profile", verifyUser, (req, res) => {
  const username = req.username;
  const updatedProfileData = req.body;

  con.query(
    "UPDATE users SET name = ?, surname = ?, email = ?, about = ?, image = ? WHERE username = ?",
    [
      updatedProfileData.name,
      updatedProfileData.surname,
      updatedProfileData.email,
      updatedProfileData.about,
      updatedProfileData.image,
      username,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Veritabanı hatası");
      } else {
        if (results.affectedRows > 0) {
          res.send(updatedProfileData);
        } else {
          res.status(404).send("Profil bulunamadı");
        }
      }
    }
  );
});

app.post("/profile-data", verifyUser, (req, res) => {
  let username = req.body.username;
  if (username == "profil") {
    username = req.username;
  }

  con.query(
    "SELECT name, surname, username, email, image, about from users  WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Veritabanı hatası");
      } else {
        if (results.length === 0) {
          res.status(404).send("Profil bulunamadı");
        } else {
          const profileData = {
            name: results[0].name,
            surname: results[0].surname,
            email: results[0].email,
            username: results[0].username,
            about: results[0].about,
            image: results[0].image,
          };

          res.send(profileData);
        }
      }
    }
  );
});

app.post("/loginform", (req, res) => {
  const { email, password } = req.body;

  req.session.username = email;

  const sql = "SELECT * FROM users WHERE email = ?";

  con.query(sql, [email], (err, data) => {
    if (err) return res.json({ Message: "Server Side Error" });
    if (data.length > 0) {
      const storedPassword = data[0].password;
      if (storedPassword === password) {
        const username = data[0].username;
        const token = jwt.sign({ username }, "our-jsonwebtoken-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        return res.json({ Status: "Success" });
      } else {
        return res.json({ Status: "WrongPassword" });
      }
    } else {
      return res.json({ Status: "EmailNotRegistered" });
    }
  });
});

app.put("/update-profile", verifyUser, (req, res) => {
  const username = req.username;
  const updatedProfileData = req.body;

  con.query(
    "UPDATE users SET name = ?, surname = ?, email = ?, about = ? WHERE username = ?",
    [
      updatedProfileData.name,
      updatedProfileData.surname,
      updatedProfileData.email,
      updatedProfileData.about,
      username,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Veritabanı hatası");
      } else {
        if (results.affectedRows > 0) {
          res.send(updatedProfileData);
        } else {
          res.status(404).send("Profil bulunamadı");
        }
      }
    }
  );
});

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", username: req.username });
});

app.post("/speaking_room", (req, res) => {
  const sqlName = "SELECT username FROM rooms where idrooms = ?";
  let userCount = 0;
  let userList = [];
  con.query(sqlName, [req.body.roomId], (err, data) => {
    if (err) return res.json({ Message: "Server Side Error" });
    if (data.length > 0) {
      userCount = data.length;
      for (let i = 0; i < userCount; i++) {
        userList.push(data[i]);
      }
      return res.json({ userCount, userList });
    } else {
      return res.json({ Message: "NO Records existed" });
    }
  });
});

app.post("/speaking_room_user", verifyUser, (req, res) => {
  const isExist =
    "SELECT idrooms FROM rooms where idrooms = ? AND username = ?";
  const sql = "INSERT INTO rooms (idrooms, username) VALUES (?, ?)";

  con.query(isExist, [req.body.roomId, req.username], (err, data) => {
    if (err) return res.json({ Message: "Server Side Error" });
    if (data.length < 1) {
      con.query(sql, [req.body.roomId, req.username], (err, data) => {
        if (err) return res.json({ Message: "Server Side Error" });
        return res.json({ Status: "Success" });
      });
    }
  });
});
app.post("/speaking_room_user_photo", verifyUser, (req, res) => {
  let username = req.body.username;

  con.query(
    "SELECT image from users  WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Veritabanı hatası");
      } else {
        if (results.length === 0) {
          res.status(404).send("Profil bulunamadı");
        } else {
          const profileData = {
            image: results[0].image,
          };

          res.send(profileData);
        }
      }
    }
  );
});

app.post("/speaking_room_leave", verifyUser, (req, res) => {
  const isExist =
    "SELECT idrooms FROM rooms where idrooms = ? AND username = ?";
  const sql = "DELETE FROM rooms WHERE idrooms = ? AND username = ?";
  con.query(isExist, [req.body.roomId, req.username], (err, data) => {
    if (err) return res.json({ Message: "Server Side Error" });
    if (data.length > 0) {
      con.query(sql, [req.body.roomId, req.username], (err, data) => {
        if (err) return res.json({ Message: "Server Side Error" });
        return res.json({ Status: "Success" });
      });
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../client/public/images/profile"));
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    const ext = path.extname(file.originalname);
    const username = req.body.username;
    cb(null, `${username}${ext}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-profile-image", upload.single("profile"), (req, res) => {
  const filepath = "images/profile/" + path.basename(req.file.path);
  console.log(path.basename(req.file.path));
  const username = req.body.username;

  con.query(
    "UPDATE users SET image = ? WHERE username = ?",
    [filepath, username],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Veritabanı hatası");
      } else {
        if (results.affectedRows > 0) {
          res.json({ filepath: filepath });
        } else {
          res.status(404).send("Profil bulunamadı");
        }
      }
    }
  );

  console.log("File saved at:", filepath);
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(8001, () => {
  console.log("running backend server");
});
