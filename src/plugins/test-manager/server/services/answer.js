'use strict';

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create('plugin::test-manager.answer', { data });
  },

  async find(params) {
    return await strapi.entityService.findMany('plugin::test-manager.answer', params);
  },

  async findOne(id) {
    return await strapi.entityService.findOne('plugin::test-manager.answer', id);
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::test-manager.answer', id);
  }
});
