let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-05T09:25:10.144Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:ec72175a-f01a-004c-01cb-6367b3000000\nTime:2019-09-05T09:25:10.4020693Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec72175a-f01a-004c-01cb-6367b3000000',
  'x-ms-client-request-id',
  'a0887b16-7531-43d7-8f05-540b591d0914',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:25:09 GMT',
  'Connection',
  'close' ]);

