const assert = require('assert');
const {alert, alertStatus} = require('../../entities/alert');
const config = require('../../config');
const {escalationPolicy} = require('../../entities/escalationPolicy');
const {target} = require('../../entities/target');
const {level} = require('../../entities/level');

describe('Alert tests', () => {
  const target1 = Object.create(target);
  const target2 = Object.create(target);
  target1.init('John Smith', {phone: '09091234'});
  target2.init('Juan Perez', {email: 'juan@aircall.com'});

  const level1 = Object.create(level);
  const level2 = Object.create(level);
  level1.init([target1]);
  level2.init([target2]);

  it('Stops escalation immediately for a triggered alert without escalation policy', () => {
    const a = Object.create(alert);
    a.init('Error');
    a.trigger();
    assert.equal(a.status, alertStatus.stoppedEscalating);
  });

  it('Sets as triggered an alert that has been just triggered', () => {
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
