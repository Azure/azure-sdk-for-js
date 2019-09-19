let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-09-06T09:29:06.441Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:9c17080e-c01e-00fe-2595-6498c2000000\nTime:2019-09-06T09:29:06.7315381Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9c17080e-c01e-00fe-2595-6498c2000000',
  'x-ms-client-request-id',
  '2e334c8f-58f9-446d-8554-922dc5eac76d',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:29:06 GMT',
  'Connection',
  'close' ]);

