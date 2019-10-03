const {alert} = require('./alert');

/**
 * Generic service definition.
 *
 */
const service = {
  init(name, optProps = {}) {
    this.name = name;
    this.alerts = [];
    if (optProps.escalationPolicy) {
      this.escalationPolicy = optProps.escalationPolicy;
    }
  },

  triggerAlert(errorMessage) {
    const a = Object.create(alert);
    this.alerts.push(a);
    a.init(errorMessage, this.escalationPolicy, this);
    a.trigger();
  },
};

module.exports = {service};
