'use strict';

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create('plugin::test-manager.givenanswer', { data });
  },

  async find(query) {
    return await strapi.entityService.findMany('plugin::test-manager.givenanswer', query);
  },

  async update(id, data) {
    return await strapi.entityService.update('plugin::test-manager.givenanswer', id, { data });
  },

  async findOne(id) {
    return await strapi.entityService.findOne('plugin::test-manager.givenanswer', id);
  },

  async delete(id) {
    return await strapi.entityService.delete('plugin::test-manager.givenanswer', id);
  }
});
