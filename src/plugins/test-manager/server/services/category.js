'use strict';

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create('plugin::test-manager.category', { data });
  },

  async find(params) {
    return await strapi.entityService.findMany('plugin::test-manager.category', params);
  },

  async findOne(id) {
    return await strapi.entityService.findOne('plugin::test-manager.category', id);
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::test-manager.category', id);
  }
});
