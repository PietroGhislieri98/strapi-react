'use strict';

module.exports = {
  async create(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('sex').create(ctx.request.body);
  },

  async find(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('sex').find(ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('sex').findOne(id);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('sex').delete(id);
  }
};
