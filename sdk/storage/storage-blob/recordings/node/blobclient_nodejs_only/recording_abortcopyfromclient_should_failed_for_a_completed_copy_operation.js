let nock = require('nock');

module.exports.hash = "02708dbd052d57cfac5b777ed6401bfd";

module.exports.testInfo = {"uniqueName":{"container":"container159210827905305357","blob":"blob159210827906909042","copiedblob":"copiedblob159210827908404961"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827905305357')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EBE23EAB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13098f9-201e-003e-2c02-42dadf000000',
  'x-ms-client-request-id',
  '6b259cf2-7411-4c0f-84f2-772f2d198bf6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827905305357/blob159210827906909042', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EBE51A2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13098fe-201e-003e-3002-42dadf000000',
  'x-ms-client-request-id',
  'c4010adb-a714-4e20-99ad-97c3019d8e0d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:59.0812203Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827905305357/copiedblob159210827908404961')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EBE87626"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130990a-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  '087b14eb-6a74-41b1-9507-81372d780e56',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:59.1032358Z',
  'x-ms-copy-id',
  'e18debef-2925-4662-bc90-92b593156c29',
  'x-ms-copy-status',
  'success',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827905305357/copiedblob159210827908404961')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:c1309911-201e-003e-4102-42dadf000000\nTime:2020-06-14T04:17:59.1145309Z</Message><HeaderName>x-ms-copy-source</HeaderName><HeaderValue>e18debef-2925-4662-bc90-92b593156c29</HeaderValue></Error>", [
  'Content-Length',
  '358',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309911-201e-003e-4102-42dadf000000',
  'x-ms-client-request-id',
  '43ba3878-3869-4638-abf6-db48b8734187',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827905305357')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309915-201e-003e-4502-42dadf000000',
  'x-ms-client-request-id',
  '01bfa587-49e7-4438-8dfd-2668c9adc863',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);
