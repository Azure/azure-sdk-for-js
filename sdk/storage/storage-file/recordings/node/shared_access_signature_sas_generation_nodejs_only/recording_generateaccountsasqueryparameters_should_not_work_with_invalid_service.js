let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-06T07:02:00.051Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:37ce0458-001a-0147-7780-6462d5000000\nTime:2019-09-06T07:02:00.3214711Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37ce0458-001a-0147-7780-6462d5000000',
  'x-ms-client-request-id',
  'e3b6193b-1e80-4415-bc3b-2fe8462c340c',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:02:00 GMT',
  'Connection',
  'close' ]);

