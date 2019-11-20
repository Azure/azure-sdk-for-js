let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-11T02:22:17.053Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:17ccfd3c-401a-0035-4f47-68c8a9000000\nTime:2019-09-11T02:22:17.3927938Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17ccfd3c-401a-0035-4f47-68c8a9000000',
  'x-ms-client-request-id',
  '4836c3b3-7932-42ad-91c3-bc7bd9cf3b32',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:16 GMT' ]);

