var Statistics = require('../../libraries/statistics');
/*
 * GET /book route to retrieve all the books.
 */
function getRanges(req, res) {
  let data = {};
  var list  = JSON.parse(req.file.buffer.toString('utf8'));
  let statistics = new Statistics();
  data = statistics.getRanges(list);
  res.json(data);
  // res.json(list);
}

module.exports = { getRanges };
