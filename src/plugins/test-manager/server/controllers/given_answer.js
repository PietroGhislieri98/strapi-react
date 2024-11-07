'use strict';

module.exports = {
  async create(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('givenanswer').create(ctx.request.body);
  },

  async find(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('givenanswer').find(ctx.query);
    console.log(ctx.body)

  },

  async findOne(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('givenanswer').findOne(id);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('givenanswer').delete(id);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body;
    const response = await strapi.plugin('test-manager').services['givenanswer'].update(id, data);
    ctx.send(response);
  },

};
