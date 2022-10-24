import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import * as td from 'testdouble';

import installVerifyAssertion from 'testdouble-qunit';
import { setup } from 'qunit-dom';
import { installWaitFor } from 'qunit-wait-for';

installWaitFor(QUnit);
installVerifyAssertion(QUnit, td);
setup(QUnit.assert);

setApplication(Application.create(config.APP));

start();
