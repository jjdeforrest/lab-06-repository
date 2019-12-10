'use strict';

const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();
 
app.listyen(PORT, () => {
  console.log(`app is up on PORT: ${PORT}`);
})