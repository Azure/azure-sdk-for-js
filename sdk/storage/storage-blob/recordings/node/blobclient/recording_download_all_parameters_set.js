let nock = require('nock');

module.exports.hash = "87820c4f8c0becd0eb20a5c62a64900f";

module.exports.testInfo = {"uniqueName":{"container":"container159210827211503712","blob":"blob159210827213109079"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827211503712')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7BF99C0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e48-201e-003e-2502-42dadf000000',
  'x-ms-client-request-id',
  'fbb06cca-0be0-4eea-9d36-ce396f6d57a7',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827211503712/blob159210827213109079', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E7C29DDD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e50-201e-003e-2c02-42dadf000000',
  'x-ms-client-request-id',
  '6d661c92-f0d5-40ab-bebf-c873a9bf5431',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:52.1453296Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827211503712/blob159210827213109079')
  .reply(206, "H", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E7C29DDD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e54-201e-003e-3002-42dadf000000',
  'x-ms-client-request-id',
  '55ee662c-e32d-46bf-9a6d-78ca9612c1d9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:52.1453296Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'MlSW/U5mnKQ=',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827211503712/blob159210827213109079')
  .reply(206, "e", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '4WcXl8UuFfdjOAtF6EHsMg==',
  'Content-Range',
  'bytes 1-1/11',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E7C29DDD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e5f-201e-003e-3902-42dadf000000',
  'x-ms-client-request-id',
  '0870a220-b737-4830-9a8b-8a6e1634e419',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:52.1453296Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827211503712/blob159210827213109079')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BothCrc64AndMd5RangeHeaderPresent</Code><Message>Both x-ms-range-get-content-crc64 header and x-ms-range-get-content-md5 header are present.\nRequestId:c1308e65-201e-003e-3f02-42dadf000000\nTime:2020-06-14T04:17:52.1806035Z</Message></Error>", [
  'Content-Length',
  '293',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e65-201e-003e-3f02-42dadf000000',
  'x-ms-client-request-id',
  'dc51d8d5-b203-4ffd-8a76-51022caa2805',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BothCrc64AndMd5RangeHeaderPresent',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827211503712')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308e6a-201e-003e-4402-42dadf000000',
  'x-ms-client-request-id',
  '4f540f6d-c811-4731-80ab-d66c1a142949',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);
