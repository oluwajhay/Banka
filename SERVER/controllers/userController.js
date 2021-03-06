/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import users from '../dummyData/user';

/**
 * @exports
 * @class UserController
 */

class UserController {
  static registerUser(req, res) {
    let user = users.find(check => check.email === req.body.email);
    if (user) {
      return res.status(400).json({
        status: 400,
        error: 'User already exist',
      });
    }

    user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      type: req.body.type,
      isAdmin: req.body.isAdmin,
      password: bcrypt.hashSync(req.body.password),
      token,
    };
    users.push(user);

    const payload = {
      email: user.email,
      type: user.type,
      id: user.id,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, 'privatekey', {
      expiresIn: '24h',
    });

    res.header('Authorization', token).status(201);
    res.json({
      status: 201,
      message: 'Registration successful',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        type: user.type,
        isAdmin: user.isAdmin,
      },
    });
  }

  static loginUser(req, res) {
    const user = users.find(check => check.email === req.body.email && bcrypt.compareSync(req.body.password, check.password));
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }
    const payload = {
      email: user.email,
      type: user.type,
      id: user.id,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, 'privatekey', {
      expiresIn: '24h',
    });
    res.json({
      status: 200,
      message: 'Login successful',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
        isAdmin: user.isAdmin,

      },
    });
  }
}

export default UserController;
