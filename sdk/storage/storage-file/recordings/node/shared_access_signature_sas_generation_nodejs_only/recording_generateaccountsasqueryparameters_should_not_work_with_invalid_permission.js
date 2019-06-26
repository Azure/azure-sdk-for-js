let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-25T23:34:06.768Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:cea1d8b5-101a-0013-67ae-2b4f70000000\nTime:2019-06-25T23:34:07.0438102Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cea1d8b5-101a-0013-67ae-2b4f70000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:34:06 GMT',
  'Connection',
  'close' ]);

