// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var ConnectionConfig = require('../lib/config.js');

describe('ConnectionConfig', function () {
  it('populates host from the connection string\'s Endpoint', function () {
    var config = new ConnectionConfig('Endpoint=sb://abc');
    config.should.have.property('host')
      .that.equals('abc');
  });
  
  it('populates keyName from the connection string\'s SharedAccessKeyName', function () {
    var config = new ConnectionConfig('SharedAccessKeyName=abc');
    config.should.have.property('keyName')
      .that.equals('abc');
  });
  
  it('populates key from the connection string\'s SharedAccessKey', function () {
    var config = new ConnectionConfig('SharedAccessKey=abc');
    config.should.have.property('key')
      .that.equals('abc');
  });
  
  it('populates path from the connection string\'s EntityPath', function () {
    var config = new ConnectionConfig('EntityPath=abc');
    config.should.have.property('path')
      .that.equals('abc');
  });

  it('populates path from the path argument if connection string doesn\'t have EntityPath', function () {
    var config = new ConnectionConfig('', 'abc');
    config.should.have.property('path')
      .that.equals('abc');
  });
});