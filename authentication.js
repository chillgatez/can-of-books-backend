const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-m12a6dyw8qu7lgb7.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://canofbooks/api',
  issuer: 'https://dev-m12a6dyw8qu7lgb7.us.auth0.com/',
  algorithms: ['RS256'],
});

const getUserInfo = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const userResponse = await axios.get('https://dev-m12a6dyw8qu7lgb7.us.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    req.userInfo = userResponse.data;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user information' });
  }
};

module.exports = { verifyJwt, getUserInfo };