const assert = require('assert');
const {service} = require('../../entities/service');

describe('Service alerts', () => {
  it('Alert is created when triggered', () => {
    const s = Object.create(service);
    s.init('Test service');
    s.triggerAlert('Test');
    assert.equal(s.alerts[0].errorMessage, 'Test');
  });
});
