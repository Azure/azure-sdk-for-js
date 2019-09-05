let nock = require('nock');

module.exports.testInfo = {"container":"container156776203055009018","blob":"blob156776203094900030"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776203055009018')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:10 GMT',
  'ETag',
  '"0x8D732AC651D94C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96484213-e01e-0050-2d95-6435d3000000',
  'x-ms-client-request-id',
  '4da5ab0d-d0fe-41f4-95ff-b92b2a3a40ff',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776203055009018/blob156776203094900030')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AccessTierNotSupportedForBlobType</Code><Message>The access tier is not supported for this blob type.\nRequestId:70073967-301e-00b7-6895-64da29000000\nTime:2019-09-06T09:27:11.2345723Z</Message></Error>", [ 'Content-Length',
  '254',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70073967-301e-00b7-6895-64da29000000',
  'x-ms-client-request-id',
  'b839dcbe-2813-4449-b0bb-5a67b0cafc3e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AccessTierNotSupportedForBlobType',
  'Date',
  'Fri, 06 Sep 2019 09:27:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776203055009018')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cd16da64-701e-014d-5e95-64c662000000',
  'x-ms-client-request-id',
  '7b0b40a8-b227-4788-9060-7de8bb50f10e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:10 GMT',
  'Connection',
  'close' ]);

