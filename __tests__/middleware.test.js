'use strict';

const supergoose = require('@code-fellows/supergoose');
const auth = require('../src/auth/middleware.js');
const Users = require('../src/auth/users.schema.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { server } = require('../src/server');
const mockRequest = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

beforeEach(async () => {
  await new Users({username: 'admin', password: 'password', role: 'admin', email:'admin@admin.com'}).save();
});

describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async () => {

        const results = await mockRequest.post('/signup').send(users[userType]);

        expect(results.body.user).toBeDefined();

        expect(results.body.token).toBeDefined();

        const token = jwt.verify(results.body.token, process.env.JWT_SECRET);

        expect(token.role).toBe(userType);

      });

      it('can signin with basic', async () => {

        const { username } = users[userType];
        const { password } = users[userType];

        const results = await mockRequest
          .post('/signin').auth(username, password);

        const token = jwt.verify(results.body.token, process.env.JWT_SECRET);

        expect(token.role).toBe(userType);

      });
    });
  });
});

describe.skip('Auth Middleware', () => {

  let errorObject = {'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized'};

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46Zm9v',
        },
      };

      let res = {};
      let next = jest.fn();

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(errorObject);

    });

    it('logs in an admin user with the right credentials', async () => {

      let req = {
        headers: {
          authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        },
      };
      let res = {};
      let next = jest.fn();

      await auth(req,res,next);

      expect(next).toHaveBeenCalledWith();

    });

  });

});