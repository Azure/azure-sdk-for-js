let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-05T09:25:10.944Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:37f7e3fc-d01a-0136-66cb-6384fe000000\nTime:2019-09-05T09:25:11.2102426Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37f7e3fc-d01a-0136-66cb-6384fe000000',
  'x-ms-client-request-id',
  '0b3e028c-4255-43a5-86f7-57a0c97e421c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:25:11 GMT',
  'Connection',
  'close' ]);

