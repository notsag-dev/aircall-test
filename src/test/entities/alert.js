const assert = require('assert');
const {alert, alertStatus} = require('../../entities/alert');
const config = require('../../config');
const {escalationPolicy} = require('../../entities/escalationPolicy');

describe('Alert tests', () => {
  const target1 = {
    name: 'Anna Smith',
    email: 'anna@testaircall.com'
  };
  const target2 = {
    name: 'John Power',
    phone: '09091234'
  };

  it('Stops escalation immediately for a triggered alert without escalation policy', () => {
    const a = Object.create(alert);
    a.init('Error');
    a.trigger();
    assert.equal(a.status, alertStatus.stoppedEscalating);
  });

  it('Sets as triggered an alert that has been just triggered', () => {
    const level1 = [target1];
    const level2 = [target2];
    const ep = Object.create(escalationPolicy);
    ep.init([level1, level2]);
    const a = Object.create(alert);
    a.init('Error', ep);
    a.trigger();
    assert.equal(a.status, alertStatus.triggered);
  });

  it('Sets alert as handled when calling handle function', () => {
    const a = Object.create(alert);
    a.handle('target', 0);
    assert.equal(a.status, alertStatus.handled);
  });

  it('Stops escalation after having escalated all levels and not having been handled', (done) => {
    const level1 = [target1];
    const ep = Object.create(escalationPolicy);
    ep.init([level1]);
    const a = Object.create(alert);
    a.init('Error', ep);
    a.trigger();
    setTimeout(() => {
      assert.equal(a.status, alertStatus.stoppedEscalating);
      done();
    }, config.alertLevelTimeout + 100);
  });
});
