let nock = require('nock');

module.exports.testInfo = {"queue":"queue156029726927503593","queue2":"queue156029726957305295"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156029726927503593')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3181669-4003-0083-13b1-20da3c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156029726957305295')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:936c927c-3003-00ea-27b1-208590000000\nTime:2019-06-11T23:54:29.8222784Z</Message></Error>", [ 'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '936c927c-3003-00ea-27b1-208590000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'QueueNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 Jun 2019 23:54:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156029726927503593')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8340b03d-c003-005e-40b1-208992000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 11 Jun 2019 23:54:29 GMT',
  'Connection',
  'close' ]);

