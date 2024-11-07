'use strict';

module.exports = {
  async create(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('test').create(ctx.request.body);
  },

  async find(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('test').find(ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('test').findOne(id);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('test').delete(id);
  }
};
