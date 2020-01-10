let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-09-11T02:20:19.840Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:fb456a8d-d003-0030-2f47-683cd6000000\nTime:2019-09-11T02:20:20.1770835Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb456a8d-d003-0030-2f47-683cd6000000',
  'x-ms-client-request-id',
  '18fbbe29-423c-41a5-99b7-7fc11952fbcb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:19 GMT' ]);

