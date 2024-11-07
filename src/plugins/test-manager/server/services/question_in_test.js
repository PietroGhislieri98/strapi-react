'use strict';

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create('plugin::test-manager.questionintest', { data });
  },

  async find(params) {
    return await strapi.entityService.findMany('plugin::test-manager.questionintest', params);
  },

  async findOne(id) {
    return await strapi.entityService.findOne('plugin::test-manager.questionintest', id);
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::test-manager.questionintest', id);
  }
});
