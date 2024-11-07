'use strict';

module.exports = {
  async create(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('testexecution').create(ctx.request.body);
  },

  async find(ctx) {
    ctx.body = await strapi.plugin('test-manager').service('testexecution').find(ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body;
    ctx.body = await strapi.plugin('test-manager').service('testexecution').findOne(id);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi.plugin('test-manager').service('testexecution').delete(id);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body;
    const response = await strapi.plugin('test-manager').services['testexecution'].update(id, data);
    ctx.send(response);
  },

};
