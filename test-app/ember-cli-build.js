'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      webpack: {
        node: {
          global: true,
        },
      },
    },

    'ember-composable-helpers': {
      only: ['pipe'],
    },
  });

  return maybeEmbroider(app);
};
