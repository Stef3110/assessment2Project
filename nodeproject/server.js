const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
const port = 3001

app.use(express.static('../src/components/uploads'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'cce817fc-56bf-4fdf-a4e1-cc0e0c417f61',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

 
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "real_estate"
})

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const requireAuth = (req, res, next) => {
  console.log("Req Auth ID: " + req.session.userId)
  if (req.session.userId) {
      next();
  } else {
    res.status(401).json({message: "Not allowed"})
  }
}

app.get('/userProfile', requireAuth, (req, res) => {
  res.status(200).json({ message: "Protected data" });
});

app.get('/isLoggedIn', requireAuth, (req, res) => {
  res.status(200).json({ message: "Protected data" });
});

 
app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const mobile = req.body.mobile;
 
    con.query("INSERT INTO users (email, username, password, mobile) VALUES (?, ?, ?, ?)", [email, username, password, mobile], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    )
})
 
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  con.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.length > 0) {
          const { userID, email, role } = result[0];
          console.log("USER ID: " + userID)
          req.session.userId = userID; 
          req.session.role = role;
          console.log(req.session.userId)
          res.status(200).json({ userID, email, role });
        } else {
          res.status(401).json({ message: "Wrong email or password" });
        }
      }
    }
  );
});

app.get('/getUserDetails', requireAuth, (req, res) => {
  const userId = req.session.userId;
  con.query("SELECT * FROM users WHERE userID = ?", [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user details:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length > 0) {
        const { email, username, mobile } = result[0];
        res.status(200).json({ email, username, mobile });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({message: "Logged out"})
  });
});




app.post("/addproperty", upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'images', maxCount: 4 }]), (req, res) => {
  if (!req.files || !req.files.profilePicture || !req.files.images) {
      return res.status(400).send('No files were uploaded.');
  }

  const address = req.body.address;
  const lon = req.body.lon;
  const lat = req.body.lat;
  const description = req.body.description;
  const floor = req.body.floor;
  const price = req.body.price;
  const rentPrice = req.body.rentPrice;
  const userID = req.session.userId;
  const confirmed = 0;

  const profileImageFileName = req.files.profilePicture[0].filename; 
  const images = req.files.images.map(file => file.filename); 

  con.query("INSERT INTO properties (address, lon, lat, description, floor, price, rentPrice, userID, confirmed, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
  [address, lon, lat, description, floor, price, rentPrice, userID, confirmed, profileImageFileName], 
  (err, result) => {
      if (err) {
          console.error("Error adding property:", err);
          res.status(500).json({ error: "Internal server error" });
      } else {
          const propertyID = result.insertId;
          images.forEach(imageFileName => {
              con.query("INSERT INTO images (filepath, filename, propertyID) VALUES (?, ?, ?)", [imageFileName, imageFileName, propertyID], (err, result) => {
                  if (err) {
                      console.error("Error adding image:", err);
                  }
              });
          });
          res.status(200).json({ message: "Property added successfully" });
      }
  }
);

});






app.get('/confirmedProperties', requireAuth,(req, res) => {
  con.query('SELECT * FROM properties WHERE confirmed = 1', (error, results) => {
    if (error) throw error;
    console.log(results)
    res.json(results);
  });
});


app.get('/unconfirmedProperties', requireAuth,(req, res) => {
  con.query('SELECT p.*, u.mobile, u.userID, u.username FROM properties p INNER JOIN users u ON p.userID = u.userID WHERE p.confirmed = 0', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.put('/confirmProperty/:propertyID', (req, res) => {
  const { propertyID } = req.params;
  con.query('UPDATE properties SET confirmed = 1 WHERE propertyID = ?', propertyID, (error, results) => {
    if (error) throw error;
    res.json({ message: 'Property confirmed successfully' });
  });
});

app.delete('/deleteProperty/:propertyID', (req, res) => {
  const { propertyID } = req.params;
  con.query('DELETE FROM images WHERE propertyID = ?', propertyID, (error, results) => {
    if (error) {
      console.error('Error deleting images:', error);
      return res.status(500).json({ message: 'An error occurred while deleting property images' });
    }
    con.query('DELETE FROM properties WHERE propertyID = ?', propertyID, (error, results) => {
      if (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({ message: 'An error occurred while deleting property' });
      }
      res.json({ message: 'Property and associated images deleted successfully' });
    });
  });
});

app.post('/savepropertyTEST', (req, res) => {
  const { address, lat, lon, userID } = req.body;
  const query = 'INSERT INTO properties (address, lat, lon, userID) VALUES (?, ?, ?, ?)';
  con.query(query, [address, lat, lon, userID], (error, results) => {
    if (error) {
      console.error('Error saving property:', error);
      res.status(500).json({ error: 'Error saving property' });
      return;
    }
    console.log('Property saved successfully:', results);
    res.json({ success: true });
  });
});



app.post('/upload', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const images = req.files.map(file => ({
    filename: file.filename,
    filepath: file.path
  }));
  const propertyID = req.body.propertyID; 
  const sql = 'INSERT INTO images (propertyID, filename, filepath) VALUES ?';
  con.query(sql, [images.map(image => [propertyID, image.filename, image.filepath])], 
  (err, result) => {
    if (err) {
      console.error('Error inserting images:', err);
      return res.status(500).send('An error occurred while uploading images.');
    }
    res.status(200).send('Images uploaded successfully.');
  });
});


app.get('/allbuyproperties', (req, res) => {
  let sortBy = req.query.sortBy || 'price';
  let sortOrder = 'ASC';
  if (sortBy.endsWith('Desc')) {
    sortBy = sortBy.slice(0, -4); 
    sortOrder = 'DESC';
  }
  const query = `    SELECT * FROM properties WHERE confirmed = 1 AND price IS NOT NULL ORDER BY ${sortBy} ${sortOrder}`;
  con.query(query, 
    (err, result) => {
    if (err) {
      console.error('Error fetching properties:', err);
      res.status(500).json({ error: 'Error fetching properties' });
    } else {
      res.json(result);
    }
  });
});
app.get('/allrentproperties', (req, res) => {
  let sortBy = req.query.sortBy || 'price';
  let sortOrder = 'ASC';
  if (sortBy.endsWith('Desc')) {
    sortBy = sortBy.slice(0, -4); 
    sortOrder = 'DESC';
  }
  const query = `    SELECT * FROM properties WHERE confirmed = 1 AND rentPrice IS NOT NULL ORDER BY ${sortBy} ${sortOrder}`;
  con.query(query, 
    (err, result) => {
    if (err) {
      console.error('Error fetching properties:', err);
      res.status(500).json({ error: 'Error fetching properties' });
    } else {
      res.json(result);
    }
  });
});


app.get('/properties/:propertyID', (req, res) => {
  const propertyID = req.params.propertyID;
  con.query('SELECT * FROM properties WHERE propertyID = ?', [propertyID], 
  (err, result) => {
    if (err) {
      console.error('Error fetching property details:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Property not found');
      return;
    }
    res.json(result[0]);
  });
});

app.get('/images/:propertyID', (req, res) => {
  const propertyID = req.params.propertyID;

  const sql = 'SELECT * FROM images WHERE propertyID = ?';
  con.query(sql, [propertyID], (err, results) => {
    if (err) {
      console.error('Error retrieving images from database:', err);
      return res.status(500).send('An error occurred while fetching images.');
    }
    
    res.status(200).json(results);
  });
});

app.get("/users/:userID", (req, res) => {
  const userID = req.params.userID;
  con.query("SELECT mobile,username FROM users WHERE userID = ?", [userID], (err, result) => {
    if (err) {
      console.error("Error fetching user details:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

app.get('/myProperties', (req, res) => {
  const userID = req.session.userId;
  con.query('SELECT * FROM properties WHERE userID = ?', [userID], (err, results) => {
      if (err) {
          console.error('Error fetching properties:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json(results);
      }
  });
});

app.put('/hideProperty/:propertyID', (req, res) => {
  const propertyID = req.params.propertyID;
  con.query('UPDATE properties SET confirmed = 2 WHERE propertyID = ?', [propertyID], (err, result) => {
      if (err) {
          console.error('Error hiding property:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json({ message: 'Property hidden successfully' });
      }
  });
});

app.put('/showProperty/:propertyID', (req, res) => {
  const propertyID = req.params.propertyID;
  con.query('UPDATE properties SET confirmed = 1 WHERE propertyID = ?', [propertyID], (err, result) => {
      if (err) {
          console.error('Error updating property status:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json({ message: 'Property status updated successfully' });
      }
  });
});



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})