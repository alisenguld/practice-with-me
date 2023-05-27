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

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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
  password: "H*J^sGc67&@HXnx@s2",
  database: "proje",
});

const verifyUser = (req, res, next) => {
  //next is a middleware
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "we need token please provide it." });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication error" });
      } else {
        req.username = decoded.username;
        next(); // app.get e geri dönmesini sağlıyor
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

  // E-posta adresi kontrolü
  con.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) throw error;

      if (results.length === 0) {
        // Kullanıcı bulunamadı
        return res.send("Kullanıcı bulunamadı.");
      } else {
        // Rastgele bir şifre oluşturma
        const newPassword = crypto.randomBytes(20).toString("hex");

        // Veritabanında yeni şifrenin kaydedilmesi
        con.query(
          "UPDATE users SET password = ? WHERE email = ?",
          [newPassword, email],
          (error, results) => {
            if (error) throw error;

            // E-posta gönderme
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

              // E-posta gönderildi
              res.send("E-posta gönderildi"); // E-posta gönderildiğinde bir yanıt gönderiyoruz
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

app.get("/profile-data", verifyUser, (req, res) => {
  const username = req.username;

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

  // Kullanıcı adını oturum bilgisine ekleyin
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
    cb(null, path.join(__dirname, "../client/public/images/profile")); // Dosyaların kaydedileceği klasör
  },
  filename: function (req, file, cb) {
    console.log(req.body); // Bu satırı ekledik
    const ext = path.extname(file.originalname); // Dosya uzantısını alın
    const username = req.body.username; // Kullanıcı adını alın
    cb(null, `${username}${ext}`); // Dosya adını geri döndürün
  },
});

const upload = multer({ storage: storage });

app.post("/upload-profile-image", upload.single("profile"), (req, res) => {
  // Use path.relative() to get the path relative to the project root
  const filepath = "images/profile/" + path.basename(req.file.path);
  const username = req.body.username; // Kullanıcı adını burada alın.

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

app.listen(8001, () => {
  console.log("running backend server");
});
