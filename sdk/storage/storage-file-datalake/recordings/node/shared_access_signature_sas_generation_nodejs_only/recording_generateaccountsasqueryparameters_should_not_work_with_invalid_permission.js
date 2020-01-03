let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{"tmr":"2019-12-03T05:12:41.203Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:a6ae878f-901e-00a0-6a97-a98af8000000\nTime:2019-12-03T05:06:43.8893290Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6ae878f-901e-00a0-6a97-a98af8000000',
  'x-ms-client-request-id',
  'd6fdc3a4-7528-46ad-9823-61121bc0c4bb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:06:42 GMT' ]);
