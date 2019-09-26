let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758135570408789"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758135570408789')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf6153ba-6003-0095-57f0-621f36000000',
  'x-ms-client-request-id',
  '3794f0fa-f2f4-4f22-a88f-12e6a7b8f4e9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:54 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount-secondary.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758135570408789')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:7aa6e12b-b003-0014-0cf0-62286a000000\nTime:2019-09-04T07:15:56.4340791Z</Message></Error>", [ 'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7aa6e12b-b003-0014-0cf0-62286a000000',
  'x-ms-client-request-id',
  '381f0a33-4b3d-48d7-93cc-565df925b328',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'QueueNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758135570408789')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02616e66-4003-0066-1cf0-62b8a3000000',
  'x-ms-client-request-id',
  'c9ea6b1a-1b2c-4ea2-aaf0-1792e347ed53',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:56 GMT',
  'Connection',
  'close' ]);

