let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-13T16:23:02.808Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:b181f50e-001a-0084-16c9-212cb9000000\nTime:2019-06-13T09:22:47.8404562Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b181f50e-001a-0084-16c9-212cb9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:22:47 GMT',
  'Connection',
  'close' ]);

