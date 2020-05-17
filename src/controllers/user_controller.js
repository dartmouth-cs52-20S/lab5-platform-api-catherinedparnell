import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// and then the secret is usable this way: process.env.AUTH_SECRET

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

// does this need an error if it fails ?? or does the model already give one
export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

// eslint-disable-next-line consistent-return
export const signup = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;
  const { authorName } = req.body;

  if (!email || !password || !username || !authorName) {
    return res.status(422).send('Must enter in all required fields');
  }

  // do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.

  // do we also need to check if the username also exists ??

  User.findOne({ email })
    .then((result) => {
      if (result) {
        res.json({ message: 'error: user with this email already exists' });
      } else {
        // Save the new User object, then return a token same as you did in in signin
        const user = new User({
          email,
          username,
          password,
          authorName,
        });
        user.save()
          .then(() => {
            res.send({ token: tokenForUser(user) });
          })
          .catch((error) => {
            res.status(500).json({ error: 'user could not be saved' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'something went wrong' });
    });
};
