let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-22T21:00:13.981Z"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-04-23T21%3A00%3A13Z","sp":"wdlcup","sig":"ldXiuMMZZR3zDc98%2FWv8ZI%2F8azbuGJcpr%2FL8JHSazaU%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:daa2b80d-c003-006c-794e-f9368b000000\nTime:2019-04-22T21:00:14.4052315Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'daa2b80d-c003-006c-794e-f9368b000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:13 GMT',
  'Connection',
  'close' ]);
