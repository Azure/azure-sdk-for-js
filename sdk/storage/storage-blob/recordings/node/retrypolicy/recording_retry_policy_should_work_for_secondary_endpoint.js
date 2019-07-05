let nock = require('nock');

module.exports.testInfo = {"container":"container156231866914508613"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231866914508613')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:10 GMT',
  'ETag',
  '"0x8D7012A1E095BF1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '516791b6-f01e-0039-1712-337e32000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount-secondary.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231866914508613')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:b9cdedeb-401e-00ca-4f12-3373dd000000\nTime:2019-07-05T09:21:12.0713489Z</Message></Error>", [ 'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9cdedeb-401e-00ca-4f12-3373dd000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231866914508613')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af58e355-301e-000d-2912-33d19a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:11 GMT',
  'Connection',
  'close' ]);

