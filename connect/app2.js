var connect = require('connect');

module.exports = connect(
  connect.logger(),
  connect.static(__dirname)
).listen(4000);
