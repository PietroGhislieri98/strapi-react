'use strict';

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create('plugin::test-manager.test', { data });
  },

  async find(params) {
    return await strapi.entityService.findMany('plugin::test-manager.test', params);
  },

  async findOne(id, params = {}) {
    const query = {
      ...params,
      populate: {
        questionintests: {
          populate: {
            questions: {
              populate: {
                answers: {
                  populate: ['answer'], 
                },
              },
            },
          },
        },
      },
    };

    return await strapi.entityService.findOne('plugin::test-manager.test', id, query);
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::test-manager.test', id);
  }
});
