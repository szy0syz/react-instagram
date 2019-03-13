'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api', controller.api.index);

  const api_v2_Router = app.router.namespace('/api/v2');
  api_v2_Router.post('/login/register', controller.login.register);
};
