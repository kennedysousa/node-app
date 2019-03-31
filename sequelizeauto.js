var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('sakila', 'root', 'welcome1',{
  host: 'localhost',
  port:'3306'
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});