const express = require('express');
const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');

/*This statement sets the execution mode to verbose to produce messages 
in the terminal regarding the state of the runtime.This feature can help
explain what the application is doing,  specifically SQLite */
const inputCheck = require('./utils/inputCheck');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use api routes
app.use('/api', apiRoutes);

// Default response for any other requests(Not Found) Catch all
app.use((req, res) => {
  res.status(404).end();
});


//start server after the db connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}...`);
  });
});


