module.exports = [
  {
    method: 'POST',
    path: '/questions',
    handler: 'question.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/questions',
    handler: 'question.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/questions/:id',
    handler: 'question.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/questions/:id',
    handler: 'question.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/categories',
    handler: 'category.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/categories',
    handler: 'category.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/categories/:id',
    handler: 'category.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/categories/:id',
    handler: 'category.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/tests',
    handler: 'test.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/tests',
    handler: 'test.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/tests/:id',
    handler: 'test.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/tests/:id',
    handler: 'test.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
      method: 'POST',
      path: '/testexecutions',
      handler: 'testexecution.create',
      config: {
        policies: [],
        auth: false,
      },
  },
  {
    method: 'PUT',
    path: '/testexecutions/:id',
    handler: 'testexecution.update',
    config: {
      policies: [],
      auth: false,
    },
  },
    {
      method: 'GET',
      path: '/testexecutions',
      handler: 'testexecution.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/testexecutions/:id',
      handler: 'testexecution.findOne',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/testexecutions/:id',
      handler: 'testexecution.delete',
      config: {
        policies: [],
        auth: false,
      },
    },
  {
    method: 'POST',
    path: '/givenanswers',
    handler: 'givenanswer.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/givenanswers',
    handler: 'givenanswer.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/givenanswers/:id',
    handler: 'givenanswer.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/givenanswers/:id',
    handler: 'givenanswer.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/givenanswers/:id',
    handler: 'testexecution.update',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/questionintest',
    handler: 'questionintest.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/questionintest',
    handler: 'questionintest.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/questionintest/:id',
    handler: 'questionintest.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/questionintest/:id',
    handler: 'questionintest.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/sexes',
    handler: 'sex.create',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/sexes',
    handler: 'sex.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/sexes/:id',
    handler: 'sex.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/sexes/:id',
    handler: 'sex.delete',
    config: {
      policies: [],
      auth: false,
    },
  }
];
