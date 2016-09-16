process.env.NODE_ENV = 'test';

let chai = require('chai');
let LinkedList = require('../libraries/linkedList');
var assert = chai.assert;

// chai.use(chaiHttp);

describe('LinkedList', () => {
    beforeEach((done) => {
      done();
    });

    describe('Get empty list', function() {
      it('List should start empty', function() {
        let linkedList = new LinkedList();
        let size = linkedList.getSize();
        assert.equal(size, 0);
      });
    });

    describe('Add one node with two elements', function() {
      it('List must be equals to [5,6]', function() {
        let linkedList = new LinkedList();
        let valor1 = 5;
        let valor2 = 6;
        linkedList.add(valor1,valor2);
        let list = linkedList.toString();
        assert.equal(list, '[5,6]');
      });
    });

    describe('Add one node with one element', function() {
      it('List must be equals to [98,undefined]', function() {
        let linkedList = new LinkedList();
        let valor1 = 98;
        linkedList.add(valor1);
        let list = linkedList.toString();
        assert.equal(list, '[98,undefined]');
      });
    });

    describe('Add three node, each one with 2 elements', function() {
      it('List must be equals to [5]', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,8);
        linkedList.add(6,9);
        linkedList.add(7,0);
        let list = linkedList.toString();
        assert.equal(list, '[5,8;6,9;7,0]');
      });
    });

    describe('Get size list with one node', function() {
      it('It should have a size of 1', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,9);
        let size = linkedList.getSize();
        assert.equal(size, 1);
      });
    });

    describe('Get size list with seven nodes', function() {
      it('It should have a size of 7', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,8);
        linkedList.add(7,9);
        linkedList.add(14,15);
        linkedList.add(45,46);
        linkedList.add(78,79);
        linkedList.add(96,97);
        linkedList.add(77,98);
        let size = linkedList.getSize();
        assert.equal(size, 7);
      });
    });

    describe('Remove one node with the elements', function() {
      it('It should have a linkedList equal to [5,8;7,9;45,46;78,79;96,97;77,98]', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,8);
        linkedList.add(7,9);
        linkedList.add(14,15);
        linkedList.add(45,46);
        linkedList.add(78,79);
        linkedList.add(96,97);
        linkedList.add(77,98);
        var resp = linkedList.remove(14,15);
        var prueba = linkedList.toString();
        assert.equal(prueba, '[5,8;7,9;45,46;78,79;96,97;77,98]');
      });
    });

    // describe('Remove one node with the elements that no exist', function() {
    //   it('It should have a response equal to null', function() {
    //     let linkedList = new LinkedList();
    //     linkedList.add(5,8);
    //     linkedList.add(7,9);
    //     linkedList.add(14,15);
    //     linkedList.add(45,46);
    //     linkedList.add(78,79);
    //     linkedList.add(96,97);
    //     linkedList.add(77,98);
    //     var resp = linkedList.remove(35,46);
    //     assert.equal(resp, null);
    //   });
    // });


    describe('Get one node with the index', function() {
      it('It should have a node equal to [96,97]', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,8);
        linkedList.add(7,9);
        linkedList.add(14,15);
        linkedList.add(45,46);
        linkedList.add(78,79);
        linkedList.add(96,97);
        linkedList.add(77,98);
        var resp = linkedList.getNodeFromIndex(5);
        var prueba = '[' + resp.element1 + ',' + resp.element2 + ']';
        assert.equal(prueba, '[96,97]');
      });
    });

    describe('Get one node with the elements', function() {
      it('It should have a node equal to [77,98]', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,8);
        linkedList.add(7,9);
        linkedList.add(14,15);
        linkedList.add(45,46);
        linkedList.add(78,79);
        linkedList.add(96,97);
        linkedList.add(77,98);
        var resp = linkedList.getNodeFromElements(77,98);
        var prueba = '[' + resp.element1 + ',' + resp.element2 + ']';
        assert.equal(prueba, '[77,98]');
      });
    });

    describe('Get the index with the elements', function() {
      it('It should have a index of 4', function() {
        let linkedList = new LinkedList();
        linkedList.add(5,8);
        linkedList.add(7,9);
        linkedList.add(14,15);
        linkedList.add(45,46);
        linkedList.add(78,79);
        linkedList.add(96,97);
        linkedList.add(77,98);
        var resp = linkedList.indexOf(78,79);
        assert.equal(resp, 4);
      });
    });

});
