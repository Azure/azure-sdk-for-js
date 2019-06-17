let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-06-15T08:19:43.032Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:551ee4d8-401e-004f-3d53-23be89000000\nTime:2019-06-15T08:19:43.4202533Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '551ee4d8-401e-004f-3d53-23be89000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 15 Jun 2019 08:19:43 GMT',
  'Connection',
  'close' ]);

