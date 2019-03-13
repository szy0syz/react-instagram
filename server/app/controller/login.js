'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async register() {
    this.ctx.body = { success: 'true', msg: '注册成功' };
  }
}

module.exports = LoginController;
