/**
 * Escalation policy methods.
 *
 * TODO add methods to manage levels, but for now just pass them
 * as parameter.
 *
 */
const escalationPolicy = {
  init(levels) {
    this.levels = levels;
  },
};

module.exports = {escalationPolicy};
