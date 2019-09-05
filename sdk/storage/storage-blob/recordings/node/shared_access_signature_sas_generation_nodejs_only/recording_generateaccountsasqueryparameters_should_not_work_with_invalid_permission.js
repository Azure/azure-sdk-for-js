let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-09-06T09:29:06.044Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:a6e98f1a-b01e-0096-6c95-64fe52000000\nTime:2019-09-06T09:29:06.3339447Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6e98f1a-b01e-0096-6c95-64fe52000000',
  'x-ms-client-request-id',
  'f8c1b5f6-c0fe-4ad9-8153-69feea81a08a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:29:05 GMT',
  'Connection',
  'close' ]);

