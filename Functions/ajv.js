const Ajv = require('ajv').default;

const ajv = new Ajv({ strict: true, allErrors: true });

const passSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 10,
    },
  },
  required: ['password'],
  additionalProperties: false,
};

const signupSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 1,
    },
    cakeDay: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 40,
      pattern: '((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%]).{8,40})',
    },
    additionalProperties: false,
  },
};

const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    secret: {
      type: 'string',
      maxLength: 6,
      minLength: 6,
    },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

const boardSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
  additionalProperties: false,
};

const userSchema = {
  type: 'object',
  properties: {
    avatar: {
      properties: {
        body: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              pattern: '#\d{6}',
            },
          },
        },
        eye: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              pattern: '#\d{6}',
            },
          },
        },
      },
    },
    coins: {
      type: 'integer',
    },
    followers: {
      type: 'array',
    },
    following: {
      type: 'array',
    },
    karma: {
      type: 'integer',
    },
    premium: {
      properties: {
        isPremium: {
          type: 'boolean',
        },
        date: {
          type: ['string', 'null'],
        },
      },
    },
    roles: {
      type: 'array',
    },
    comments: {
      type: 'array',
    },
    username: {
      type: 'string',
    },
  },
  required: [],
  additionalProperties: false,
};

module.exports = {
  validateLogin(data) {
    if (data !== null && data !== undefined) {
      const validate = ajv.compile(loginSchema);
      validate(data);
      return (validate.errors);
    }
    return ('No data received.');
  },
  validatePass(data) {
    if (data !== null && data !== undefined) {
      const validate = ajv.compile(passSchema);
      validate(data);
      return (validate.errors);
    }
    return ('No data received.');
  },
  validateSignup(data) {
    if (data !== null && data !== undefined) {
      const validate = ajv.compile(signupSchema);
      validate(data);
      return (validate.errors);
    }
    return ('No data received.');
  },
  validateBoard(data) {
    if (data !== null && data !== undefined) {
      const validate = ajv.compile(boardSchema);
      validate(data);
      return (validate.errors);
    }
    return ('No data received.');
  },
  validateUser(data) {
    if (data !== null && data !== undefined) {
      const validate = ajv.compile(userSchema);
      validate(data);
      return (validate.errors);
    }
    return ('No data received.');
  },
};
