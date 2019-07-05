let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-07-05T09:25:29.362Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:86da411d-e01e-008c-4713-3373cd000000\nTime:2019-07-05T09:22:10.2524077Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86da411d-e01e-008c-4713-3373cd000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:22:10 GMT',
  'Connection',
  'close' ]);

