const express = require("express");
const cors = require("cors");
require('dotenv').config();
const sequelize = require("./database");
const routes = require("./routes/routes")

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

app.use('/api', routes)


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
