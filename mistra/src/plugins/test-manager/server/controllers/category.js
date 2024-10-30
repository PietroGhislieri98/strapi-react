'use strict';

module.exports = {
  async create(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('category').create(ctx.request.body);
  },

  async find(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('category').find(ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('category').findOne(id);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('category').delete(id);
  }
};
