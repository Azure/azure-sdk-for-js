let nock = require('nock');

module.exports.hash = "4bfea2dcd02cc3650fd35620f995e8fb";

module.exports.testInfo = {"uniqueName":{"container":"container160620578777301733","blob":"blob160620578947605363"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160620578777301733')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 24 Nov 2020 08:16:29 GMT',
  'ETag',
  '"0x8D890513EC93AFC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb14b82-101e-0010-223a-c2236f000000',
  'x-ms-client-request-id',
  '28e5d9b4-e9f1-4bb1-af39-4132110dd810',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 24 Nov 2020 08:16:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160620578777301733/blob160620578947605363')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 24 Nov 2020 08:16:29 GMT',
  'ETag',
  '"0x8D890513F0743AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb14b8f-101e-0010-2c3a-c2236f000000',
  'x-ms-client-request-id',
  '2a7cebc1-9f22-4331-8cb1-7dfc3374ea38',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  '+S0SCxhxqPI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Nov 2020 08:16:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160620578777301733/blob160620578947605363')
  .reply(200, "", [
  'Cache-Control',
  'max-age=600',
  'Content-Length',
  '9565',
  'Content-Type',
  'text/html; charset=utf-8',
  'Content-MD5',
  'gaanTqXOoV8WJeQ9Ug+nRg==',
  'Last-Modified',
  'Tue, 24 Nov 2020 08:16:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D890513F0743AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb14b9b-101e-0010-353a-c2236f000000',
  'x-ms-client-request-id',
  '50e92472-f8d4-42b0-bf57-8c650efc1d10',
  'x-ms-version',
  '2020-04-08',
  'x-ms-meta-key1',
  'val1',
  'x-ms-meta-key2',
  'val2',
  'x-ms-creation-time',
  'Tue, 24 Nov 2020 08:16:29 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Tue, 24 Nov 2020 08:16:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160620578777301733/blob160620578947605363')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobAlreadyExists</Code><Message>The specified blob already exists.\nRequestId:ecb14bac-101e-0010-443a-c2236f000000\nTime:2020-11-24T08:16:30.2818120Z</Message></Error>", [
  'Content-Length',
  '220',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb14bac-101e-0010-443a-c2236f000000',
  'x-ms-client-request-id',
  'f47caa97-16f7-4c56-b13a-9190ad170f5a',
  'x-ms-version',
  '2020-04-08',
  'x-ms-error-code',
  'BlobAlreadyExists',
  'Date',
  'Tue, 24 Nov 2020 08:16:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160620578777301733')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecb14bb4-101e-0010-4c3a-c2236f000000',
  'x-ms-client-request-id',
  '80d688c5-bbf1-4a58-b52f-b0adaf6566c6',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Tue, 24 Nov 2020 08:16:30 GMT'
]);
