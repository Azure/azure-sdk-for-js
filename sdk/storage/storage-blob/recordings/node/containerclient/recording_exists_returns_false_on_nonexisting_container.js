let nock = require('nock');

module.exports.testInfo = {"container":"container156996519067005561","newcontainer":"newcontainer156996519080706827"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996519067005561')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:30 GMT',
  'ETag',
  '"0x8D746B60697626E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4746a752-a01e-0134-2b9e-78d98b000000',
  'x-ms-client-request-id',
  'ad009155-be14-49cf-aad2-294c66c6f3a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newcontainer156996519080706827')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:d95a33e8-c01e-006f-599e-7898a2000000\nTime:2019-10-01T21:26:30.6043685Z</Message></Error>", [ 'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd95a33e8-c01e-006f-599e-7898a2000000',
  'x-ms-client-request-id',
  'aff9c415-6b90-4cec-9bf0-064424bec663',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 01 Oct 2019 21:26:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156996519067005561')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5b8b695-501e-0121-439e-781b12000000',
  'x-ms-client-request-id',
  '3b8abc13-1f18-435f-8bcb-2761991cf5d7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:30 GMT' ]);

