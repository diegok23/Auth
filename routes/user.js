const express = require('express');
const bcrypt = require('bcrypt');
//const fs = require('fs');
const database = require('./database/database');


// user registration / sign-up
const postSignUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
 
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const query = `INSERT INTO users (userName, email, password) ($1, $2, $3) RETURNING id`;
 
    database.pool
      .query(query, [userName, email, bcryptPassword])
      .then((result) => res.status(201).json({ userId: result.rows[0].id }))
      .catch((e) => console.error(e));

    const jwtToken = generateJWT(newUser.id);

    return res.status(201).send({ jwtToken: jwtToken, isAuthenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = postSignUp; // we need to export this router to implement it inside our server.js file
