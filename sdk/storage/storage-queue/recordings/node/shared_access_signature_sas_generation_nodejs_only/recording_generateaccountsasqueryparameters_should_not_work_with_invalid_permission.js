let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-09-04T07:16:19.139Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:49ff3e5a-a003-0041-3cf0-62af67000000\nTime:2019-09-04T07:16:19.3783369Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49ff3e5a-a003-0041-3cf0-62af67000000',
  'x-ms-client-request-id',
  'd2369fd4-d0d0-4719-91e7-000beb32bb83',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:19 GMT',
  'Connection',
  'close' ]);

