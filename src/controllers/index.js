const sampleController = require('./sample');

/**
 * Set routes for all controllers.
 *
 */
module.exports.set = (app) => {
  sampleController.set(app);
};
