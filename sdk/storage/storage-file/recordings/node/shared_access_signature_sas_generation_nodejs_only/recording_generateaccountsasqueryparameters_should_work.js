let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-13T16:23:02.109Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthenticationFailed</Code><Message>Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.\nRequestId:f3148e2d-001a-000c-70c9-219460000000\nTime:2019-06-13T09:22:47.3391351Z</Message><AuthenticationErrorDetail>Signature not valid in the specified time frame: Start [Thu, 13 Jun 2019 16:18:02 GMT] - Expiry [Fri, 14 Jun 2019 16:23:02 GMT] - Current [Thu, 13 Jun 2019 09:22:47 GMT]</AuthenticationErrorDetail></Error>", [ 'Content-Length',
  '544',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3148e2d-001a-000c-70c9-219460000000',
  'x-ms-error-code',
  'AuthenticationFailed',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:22:46 GMT',
  'Connection',
  'close' ]);

