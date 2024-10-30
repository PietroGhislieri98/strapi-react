'use strict';

module.exports = {
  async create(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('questionintest').create(ctx.request.body);
  },

  async find(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('questionintest').find(ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('questionintest').findOne(id);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('questionintest').delete(id);
  },
};
