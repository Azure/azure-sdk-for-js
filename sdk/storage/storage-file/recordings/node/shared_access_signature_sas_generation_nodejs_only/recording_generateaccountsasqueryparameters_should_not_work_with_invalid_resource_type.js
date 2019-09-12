let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-06T07:02:00.453Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:0e3aa937-001a-0005-4c80-642558000000\nTime:2019-09-06T07:02:00.7242148Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e3aa937-001a-0005-4c80-642558000000',
  'x-ms-client-request-id',
  'b40035a6-cb73-4f85-afce-50f7b5643b37',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:02:00 GMT',
  'Connection',
  'close' ]);

