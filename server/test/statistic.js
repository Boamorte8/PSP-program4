process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Statistics', () => {
    beforeEach((done) => {
        // Book.remove({}, (err) => {
           done();
        // });
    });

  /*
  * Test the /POST route
  */
  // describe('/POST book', () => {
  //     it('it should not POST a book without pages field', (done) => {
  //       let numbers = [4,4,4,4];
  //       chai.request(server)
  //           .post('/statistics/calculate')
  //           .send(numbers)
  //           .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('number');
  //               res.body.should.be.eql(4);
  //               console.log(res.body);
  //               // res.body.should.have.property('errors');
  //               // res.body.errors.should.have.property('pages');
  //               // res.body.errors.pages.should.have.property('kind').eql('required');
  //             done();
  //           });
  //     });
  //
  // });
});
