let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:22:17.463Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:66fa8b5b-401a-001c-6e47-68beeb000000\nTime:2019-09-11T02:22:17.7966866Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66fa8b5b-401a-001c-6e47-68beeb000000',
  'x-ms-client-request-id',
  'f8d8e6de-cd76-4dfb-b6ef-d7881bec4ed8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:17 GMT' ]);

