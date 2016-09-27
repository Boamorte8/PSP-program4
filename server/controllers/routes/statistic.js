var Statistics = require('../../libraries/statistics');
/*
 * GET /book route to retrieve all the books.
 */
function getRanges(req, res) {
  if (req.body.dof && req.body.x) {

  let dof = req.body.dof;
  let x = req.body.x;
  let data = {};
  // var list  = JSON.parse(req.file.buffer.toString('utf8'));
  let statistics = new Statistics();
  data = statistics.getT(dof,x);
  res.json(data);
  // res.json(list);
}else {
  res.json(null)
}

}

module.exports = { getRanges };
