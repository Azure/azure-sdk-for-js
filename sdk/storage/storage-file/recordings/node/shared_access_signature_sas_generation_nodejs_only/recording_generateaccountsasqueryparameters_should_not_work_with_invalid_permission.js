let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-04T08:14:42.146Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:4e974b3c-c01a-00ee-47f8-625daa000000\nTime:2019-09-04T08:14:42.3843460Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4e974b3c-c01a-00ee-47f8-625daa000000',
  'x-ms-client-request-id',
  '251b15f6-ada4-43df-b792-2b04a527e8ad',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:14:41 GMT',
  'Connection',
  'close' ]);

