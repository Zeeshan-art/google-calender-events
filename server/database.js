const { Sequelize } = require('sequelize');


  const sequelize = new Sequelize('testdb', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres', // specify that you're using PostgreSQL
  });
  const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize;  // Return sequelize instance for further use
};
connection()
// Export the connection function
module.exports = sequelize;
