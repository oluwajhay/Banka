/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

let token = '';
const tokens = '';


before(() => {
  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'juwon',
        lastName: 'jhay',
        email: 'juwon@gmail.com',
        password: 'password',
        type: 'staff',
        isAdmin: 'true',
      })
      .end((err, res) => {
        token = res.body.data.token;
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});

describe('UNIT TESTS DATA CONTROLLERS', () => {
  describe('/GET REQUEST', () => {
    it('it should GET route', () => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
    });
  });

  describe('/POST REQUEST', () => {
    // it('it should POST user sign up', () => {
    //   chai
    //     .request(server)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       firstName: 'juwon',
    //       lastName: 'jhay',
    //       email: 'juwon@gmail.com',
    //       password: 'password',
    //       type: 'staff',
    //       isAdmin: 'true',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.have.property('message').to.equals('Registration successful');
    //       res.body.should.have.property('status').to.equals(201);
    //       res.body.should.have.property('data');
    //     });
    // });

    it('it should fail POST user sign up', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'juwon',
          lastName: 'jhay',
          email: 'juwon@gmail.com',
          password: 'password',
          type: 'staff',
          isAdmin: 'true',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').to.equals('User already exist');
          res.body.should.have.property('status').to.equals(400);
        });
    });

    it('it should fail POST user sign up', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
        });
    });

    it('it should fail POST user sign up', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: '',
          lastName: 'jhay',
          email: 'juwon@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    });
  });

  describe('/POST REQUEST', () => {
    it('it should POST user login', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'juwon@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Login successful');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
        });
    });

    it('it should fail POST user login', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'blabla@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').to.equals('User not found');
          res.body.should.have.property('status').to.equals(404);
        });
    });

    it('it should fail POST user login', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'juwon@gmail.com',
          password: 'passwordde',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').to.equals('User not found');
          res.body.should.have.property('status').to.equals(404);
        });
    });

    it('it should fail POST user sign in', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
        });
    });

    it('it should fail POST user sign in', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    });
  });

  describe('/POST REQUEST', () => {
    it('it should POST user account', () => {
      chai
        .request(server)
        .post('/api/v1/accounts')
        .set('x-access-token', token)
        .send({
          email: 'juwon@gmail.com',
          type: 'current',
          openingBalance: 32333,
        })

        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').to.equals('Account created');
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data');
        });
    });

    it('it should fail POST user account', () => {
      chai
        .request(server)
        .post('/api/v1/accounts')
        .set('x-access-token', token)
        .send({
          email: 'juwonfew@gmail.com',
          type: 'current',
          openingBalance: 32333,
        })
        .end((err, res) => {
          // console.log(res);

          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have.property('error').to.equals('sign up before creating account');
        });
    });
  });

  describe('/PATCH REQUEST', () => {
    it('it should PATCH user account', () => {
      chai
        .request(server)
        .patch('/api/v1/accounts/4952853906')
        .set('x-access-token', token)
        .send({
          status: 'dormant',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Account Updated');
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data');
        });
    });

    it('it should fail PATCH user account', () => {
      chai
        .request(server)
        .patch('/api/v1/accounts/7767637187')
        .set('x-access-token', token)
        .send({
          status: 'dormant',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
        });
    });
  });

  it('it should fail PATCH user account', () => {
    chai
      .request(server)
      .patch('/api/v1/accounts/7767637187')
      .set('x-access-token', token)
      .send({})
      .end((err, res) => {
        // console.log(res);
        res.should.have.status(400);
        res.body.should.have.property('message').to.equals('Please fill all fields');
        res.body.should.have.property('status').to.equals(400);
      });
  });

  describe('/POST REQUEST', () => {
    it('it should credit an account 1', () => {
      chai
        .request(server)

        .post('/api/v1/accounts/3108008131/credit')
        .set('x-access-token', token)

        .send({
          amount: 33200,
        })
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('object');
        });
    });


    it('it should fail to credit an account2', () => {
      chai
        .request(server)

        .post('/api/v1/accounts/495285339306/credit')
        .set('x-access-token', token)
        .send({
          amount: 33200,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
        });
    });

    it('it should fail to credit an account3', () => {
      chai
        .request(server)
        .post('/api/v1/accounts/495285339306/credit')
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
        });
    });

    it('it should fail to credit an account4', () => {
      chai
        .request(server)
        .post('/api/v1/accounts/495285339306/credit')
        .set('x-access-token', token)
        .send({
          amount: 222,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
        });
    });
  });

  describe('/POST REQUEST', () => {
    it('it should debit an account ', () => {
      chai
        .request(server)

        .post('/api/v1/accounts/3108008131/debit')
        .set('x-access-token', token)
        .send({
          amount: 33200,
        })
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('object');
        });
    });

    it('it should fail to debit an account ', () => {
      chai
        .request(server)

        .post('/api/v1/accounts/495285339306/debit')
        .set('x-access-token', token)
        .send({
          amount: 3200,
        })
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
        });
    });

    it('it should return issufficient balance ', () => {
      chai
        .request(server)

        .post('/api/v1/accounts/4952853906/debit')
        .set('x-access-token', token)
        .send({
          amount: 332002920,
        })
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have.property('error').to.equals('Insuficient balance');
        });
    });

    it('it should fail to debit an account', () => {
      chai
        .request(server)
        .post('/api/v1/accounts/495285339306/debit')
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').to.equals('Please fill all fields');
          res.body.should.have.property('status').to.equals(400);
        });
    });

    it('it should fail to debit an account', () => {
      chai
        .request(server)
        .post('/api/v1/accounts/495285339306/debit')
        .set('x-access-token', token)
        .send({
          cashier: '',
          amount: 222,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    });
  });

  describe('/GET REQUEST', () => {
    it('it should get accounts ', () => {
      chai.request(server)
        .get('/api/v1/accounts')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('message').to.equals('List of accounts');
          res.body.should.have.property('data').to.be.an('array');
        });
    });

    it('it should get accounts ', () => {
      chai.request(server)
        .get('/api/v1/accounts/4952853906')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('object');
        });
    });

    it('it should get accounts ', () => {
      chai.request(server)
        .get('/api/v1/accounts/4952853786')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have.property('error').to.equals('Account not found');
        });
    });
  });

  describe('DELETE REQUEST', () => {
    it('it should DELETE account', () => {
      chai.request(server)
        .delete('/api/v1/accounts/4952853906')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').to.equals('Account deleted');
          res.body.should.have.property('status').to.equals(200);
        });
    });

    it('it should return error', () => {
      chai.request(server)
        .delete('/api/v1/accounts/2345566767')
        .set('x-access-token', token)

        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').to.equals('Account not found');
          res.body.should.have.property('status').to.equals(404);
        });
    });
  });
});
