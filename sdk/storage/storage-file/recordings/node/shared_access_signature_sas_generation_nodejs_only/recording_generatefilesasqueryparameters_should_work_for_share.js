let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-13T16:23:03.886Z","share":"share156044298388703236"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298388703236')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:48 GMT',
  'ETag',
  '"0x8D6EFE0B3DB9142"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'abc7270d-701a-006e-02c9-21d3b8000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:22:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044298388703236/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthenticationFailed</Code><Message>Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.\nRequestId:e8b36789-701a-00a9-02c9-21af79000000\nTime:2019-06-13T09:22:49.1480312Z</Message><AuthenticationErrorDetail>Signature not valid in the specified time frame: Start [Thu, 13 Jun 2019 16:18:03 GMT] - Expiry [Fri, 14 Jun 2019 16:23:03 GMT] - Current [Thu, 13 Jun 2019 09:22:49 GMT]</AuthenticationErrorDetail></Error>", [ 'Content-Length',
  '544',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8b36789-701a-00a9-02c9-21af79000000',
  'x-ms-error-code',
  'AuthenticationFailed',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:22:48 GMT',
  'Connection',
  'close' ]);

