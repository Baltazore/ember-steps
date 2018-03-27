import { module, test } from 'qunit';
import StateMachine from 'ember-steps/-private/state-machine';

module('Step Transition State Machine', function() {
  module('constructor', function() {
    test('uses the initial step, if provided', function(assert) {
      const m = new StateMachine({
        initialStep: 'foo'
      });

      assert.equal(m.get('currentStep'), 'foo');
    });

    test('calculates the initial step if necessary', function(assert) {
      const m = new StateMachine();
      m.addStep('foo');

      assert.equal(m.get('currentStep'), 'foo');
    });
  });

  module('#pickNext', function() {
    test('can get the next step without advancing', function(assert) {
      const m = new StateMachine();
      m.addStep('foo');
      m.addStep('bar');

      assert.equal(m.pickNext(), 'bar');
      assert.equal(m.get('currentStep'), 'foo');
    });
  });

  module('#pickPrevious', function() {
    test('can get the previous step without advancing', function(assert) {
      const m = new StateMachine();
      m.addStep('foo');
      m.addStep('bar');
      m.addStep('baz');

      assert.equal(m.pickPrevious(), 'baz');
      assert.equal(m.get('currentStep'), 'foo');
    });
  });

  module('#activate', function(hooks) {
    hooks.beforeEach(function() {
      this.m = new StateMachine();
      this.m.addStep('foo');
      this.m.addStep('bar');
    });

    test('can go to a step by name', function(assert) {
      this.m.activate('bar');
      assert.equal(this.m.get('currentStep'), 'bar');
    });

    test('throws an error if the step name is not valid', function(assert) {
      assert.throws(() => {
        this.m.activate('foobar');
      }, /Step name "foobar" is invalid/);
    });

    test('throws an error if no step name is provided', function(assert) {
      assert.throws(() => {
        this.m.activate();
      }, /No step name provided/);
    });
  });

  module('.length', function(hooks) {
    hooks.beforeEach(function() {
      this.m = new StateMachine();
      this.m.addStep('foo');
      this.m.addStep('bar');
    });

    test('is set to the number of steps', function(assert) {
      assert.equal(this.m.get('length'), 2);
    });

    test('updates as more steps are added', function(assert) {
      this.m.addStep('baz');
      assert.equal(this.m.get('length'), 3);
    });
  });

  module('.currentStep', function() {
    test('exposes the name of the current step', function(assert) {
      const m = new StateMachine();
      m.addStep('foo');
      assert.equal(m.get('currentStep'), 'foo');
    });
  });

  module('.stepArray', function() {
    test('exposes an array of step names', function(assert) {
      const m = new StateMachine();
      m.addStep('foo');
      m.addStep('bar');
      assert.deepEqual(m.get('stepArray'), ['foo', 'bar']);

      m.addStep('baz');

      assert.deepEqual(m.get('stepArray'), ['foo', 'bar', 'baz']);
    });
  });
});
