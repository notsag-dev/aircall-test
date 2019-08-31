const sampleAdapter = require('./sample');

/**
 * Set routes for all controllers.
 *
 */
module.exports.set = (app) => {
  sampleAdapter.set(app);
};
