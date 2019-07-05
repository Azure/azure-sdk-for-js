let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-07-05T09:25:29.640Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:dbcc92d8-d01e-00cb-4613-33aca6000000\nTime:2019-07-05T09:22:10.5350784Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbcc92d8-d01e-00cb-4613-33aca6000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:22:10 GMT',
  'Connection',
  'close' ]);

