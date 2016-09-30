import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { beforeEach, describe } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import { initialize as initializeEmberHook, $hook } from 'ember-hook';

describeComponent(
  'step-manager',
  'Integration: StepManagerComponent',
  {
    integration: true
  },
  function() {
    beforeEach(initializeEmberHook);

    describe('initial render', function() {
      it('renders the first step by default', function() {
        this.render(hbs`
          {{#step-manager as |w|}}
            {{w.step name='first'}}
            {{w.step name='second'}}
          {{/step-manager}}
        `);

        expect($hook('ember-wizard-step', { name: 'first' }).is(':visible')).to.be.ok;
        expect($hook('ember-wizard-step', { name: 'second' }).is(':visible')).not.to.be.ok;
      });

      it('renders `initialStep` first, if provided', function() {
        this.render(hbs`
          {{#step-manager initialStep='second' as |w|}}
            {{w.step name='first'}}
            {{w.step name='second'}}
          {{/step-manager}}
        `);

        expect($hook('ember-wizard-step', { name: 'first' }).is(':visible')).not.to.be.ok;
        expect($hook('ember-wizard-step', { name: 'second' }).is(':visible')).to.be.ok;
      });
    });

    describe('changing the current step', function() {
      it('can transition to another step', function() {
        this.render(hbs`
          {{#step-manager as |w|}}
            <button {{action w.transition-to 'second'}}>
              Transition to Next
            </button>

            {{w.step name='first'}}
            {{w.step name='second'}}
          {{/step-manager}}
        `);

        expect($hook('ember-wizard-step', { name: 'first' }).is(':visible')).to.be.ok;
        expect($hook('ember-wizard-step', { name: 'second' }).is(':visible')).not.to.be.ok;

        this.$('button').click();

        expect($hook('ember-wizard-step', { name: 'first' }).is(':visible')).not.to.be.ok;
        expect($hook('ember-wizard-step', { name: 'second' }).is(':visible')).to.be.ok;
      });
    });

    describe('collecting data', function() {
      it('triggers an event on every transition', function() {
        const onTransitionAction = td.function();
        this.on('transition', onTransitionAction);

        this.render(hbs`
          {{#step-manager on-transition=(action 'transition') as |w|}}
            <button {{action w.transition-to 'second' 'some value'}}>
              Transition to Next
            </button>

            {{w.step name='first'}}
            {{w.step name='second'}}
          {{/step-manager}}
        `);

        this.$('button').click();

        expect(onTransitionAction).to.be.calledWith('second', 'some value');
      });
    });
  }
);
