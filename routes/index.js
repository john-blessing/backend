const express = require("express");
const router = express.Router();
const ctrl = require("../controller/controller");
const jwt = require("jsonwebtoken");
const path = require("path");

router.get("/allProducts", ctrl.queryAllProducts);


router.post("/login", function(req, res, next) {
  res.cookie(
    "token",
    jwt.sign(
      {
        name: req.body.username,
        password: req.body.password
      },
      "MY_SECRET"
    )
  );
  res.send("about");
});

router.post("/upload", function(req, res, next) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("public/uploads/"+sampleFile.name, function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

module.exports = router;
