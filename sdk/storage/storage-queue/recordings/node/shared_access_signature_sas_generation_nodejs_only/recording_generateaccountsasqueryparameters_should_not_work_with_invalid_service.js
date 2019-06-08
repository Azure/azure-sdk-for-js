let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-06-08T03:18:47.420Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:62528f38-d003-0096-06a8-1dff6c000000\nTime:2019-06-08T03:18:47.2536880Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62528f38-d003-0096-06a8-1dff6c000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 03:18:47 GMT',
  'Connection',
  'close' ]);

