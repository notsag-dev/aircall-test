const config = require('../config');

const alertStatus = {
  initialized: 'initialized',
  triggered: 'triggered',
  handled: 'handled',
  stoppedEscalating: 'stoppedEscalating',
};

/**
 * Alerts handler.
 *
 */
const alert = {
  init(errorMessage, escalationPolicy) {
    this.errorMessage = errorMessage;
    this.escalationPolicy = escalationPolicy;
    this.status = alertStatus.initialized;
    this.iterate = this.iterate.bind(this);
  },

  /**
   * Trigger the alert. Update status of alert to triggered and
   * notify targets.
   *
   */
  trigger() {
    this.status = alertStatus.triggered;
    this.iterate(0);
  },

  /**
   * Iterate on levels of the escalation policy notifying users until someone
   * handles it.
   *
   */
  iterate(level) {
    if (this.status !== alertStatus.triggered) {
      return;
    }
    if (!this.escalationPolicy || level >= this.escalationPolicy.levels.length) {
      this.status = alertStatus.stoppedEscalating;
      return;
    }
    this.notify(this.errorMessage, this.escalationPolicy.levels[level]);
    setTimeout(this.iterate, config.alertLevelTimeout, level + 1);
  },

  /**
   * Handle alert by target.
   *
   */
  handle(target, level) {
    this.status = alertStatus.handled;
    this.handleInfo = {target, level};
  },

  /**
   * Notify level's targets.
   *
   */
  // eslint-disable-next-line
  notify(errorMessage, targets) {
    // TODO
  },
};

module.exports = {alert, alertStatus};
