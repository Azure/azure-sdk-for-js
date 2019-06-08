let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-06-08T02:09:33.296Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-06-09T02%3A09%3A33Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"bf8fmeXcsNKBVnxDzoy3YQRzDx4%2FyOCo3dQaKRb3YMU%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:fbab7e2d-6003-002e-3b9f-1d1d9f000000\nTime:2019-06-08T02:09:33.2011846Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbab7e2d-6003-002e-3b9f-1d1d9f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:32 GMT',
  'Connection',
  'close' ]);

