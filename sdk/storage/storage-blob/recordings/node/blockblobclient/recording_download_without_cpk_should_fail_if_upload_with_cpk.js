let nock = require('nock');

module.exports.testInfo = {"container":"container156816840055201001","blob":"blob156816840096501978","randomstring":"randomstring156816840096502074"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816840055201001')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:00 GMT',
  'ETag',
  '"0x8D7365E8C895A52"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63d0bfe7-601e-0000-7b47-6866fc000000',
  'x-ms-client-request-id',
  '543d7515-722a-4784-95c1-9ebf4ac17dca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816840055201001/blob156816840096501978', "randomstring156816840096502074")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'OY9mj+694Hag+p7rAGg8EA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:01 GMT',
  'ETag',
  '"0x8D7365E8CC952BA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4744b12d-301e-0013-6347-68531d000000',
  'x-ms-client-request-id',
  '30761f27-935f-40fd-abd5-9c39041fa994',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'O+UTFkq4Rt4=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816840055201001/blob156816840096501978')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:026ff021-201e-0043-0947-684c15000000\nTime:2019-09-11T02:20:01.7120183Z</Message></Error>", [ 'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '026ff021-201e-0043-0947-684c15000000',
  'x-ms-client-request-id',
  '9ed4782c-b19b-407a-8215-9a3fe9189e4d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816840055201001')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '484884e3-201e-0048-3247-685461000000',
  'x-ms-client-request-id',
  '682330af-4503-48c8-9abb-fff49675f36a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:01 GMT' ]);

