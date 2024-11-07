'use strict';

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create('plugin::test-manager.testexecution', { data });
  },

  async find(params) {
    return await strapi.entityService.findMany('plugin::test-manager.testexecution', params);
  },

  async findOne(id, params ={}) {
    const query = {
      ...params,
      populate: {
        givenanswer: {
          populate: {
            answers : '*'
          },
        },
      },
    };
    return await strapi.entityService.findOne('plugin::test-manager.testexecution', id, query);
  },

  async update(id, data) {
    return await strapi.entityService.update( 'plugin::test-manager.testexecution', id, { data } )
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::test-manager.testexecution', id);
  },
});
