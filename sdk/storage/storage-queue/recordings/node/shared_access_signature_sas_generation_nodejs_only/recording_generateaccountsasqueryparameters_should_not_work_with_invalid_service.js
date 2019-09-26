let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-09-04T07:16:19.541Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:157c27e2-7003-00a6-78f0-62409d000000\nTime:2019-09-04T07:16:19.7796352Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '157c27e2-7003-00a6-78f0-62409d000000',
  'x-ms-client-request-id',
  '7d417717-d291-4f7f-8424-be2523e398b3',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:19 GMT',
  'Connection',
  'close' ]);

