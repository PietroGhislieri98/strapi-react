'use strict';

module.exports = {
  async create(ctx) {
    const newEntry = await strapi.entityService.create("plugin::test-manager.questionintest", {
        data: ctx.request.body.data,
        populate: ["tests", "questions"], 
      });
      ctx.body = newEntry;
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
