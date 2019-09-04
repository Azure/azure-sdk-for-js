let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-04T08:14:42.557Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:c04f2433-901a-0038-2af8-625343000000\nTime:2019-09-04T08:14:42.7870426Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c04f2433-901a-0038-2af8-625343000000',
  'x-ms-client-request-id',
  'e2badfd1-d10b-40a3-9082-2c4725a8c0aa',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:14:41 GMT',
  'Connection',
  'close' ]);

