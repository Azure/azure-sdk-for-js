let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-05T09:25:10.548Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:d32cb5d0-f01a-00b8-6ecb-63ac45000000\nTime:2019-09-05T09:25:10.8038177Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd32cb5d0-f01a-00b8-6ecb-63ac45000000',
  'x-ms-client-request-id',
  '36ab1601-da6e-4505-81c6-0a7897b4dd7d',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:25:10 GMT',
  'Connection',
  'close' ]);

