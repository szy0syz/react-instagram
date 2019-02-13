'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = {
      success: true,
      message: 'hi, instagram.',
    };
  }
}

module.exports = HomeController;
