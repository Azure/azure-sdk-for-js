let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{"tmr":"2019-12-03T05:12:42.335Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:a6ae8ae6-901e-00a0-0697-a98af8000000\nTime:2019-12-03T05:06:45.0292772Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6ae8ae6-901e-00a0-0697-a98af8000000',
  'x-ms-client-request-id',
  '3ba53b76-b6c9-471e-abed-511a2adacfff',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 05:06:44 GMT' ]);
