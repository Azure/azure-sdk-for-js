// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
var expect = chai.expect;
var Promise = require('bluebird');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('#something', function () {
  it('does something', function () {
	expect(Promise.resolve('hello')).to.eventually.not.equal('world');
  });
});