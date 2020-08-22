let nock = require('nock');

module.exports.hash = "afa85391c0cc900675990e5afe772e0c";

module.exports.testInfo = {"uniqueName":{"container":"container159341668720405141","blob":"blob159341668750408325"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159341668720405141')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 29 Jun 2020 07:44:45 GMT',
  'ETag',
  '"0x8D81C004B058141"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba47e-f01e-0065-1de9-4d0c4b000000',
  'x-ms-client-request-id',
  '8a525b0f-0d53-4c22-adeb-b5d77a0525ec',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 07:44:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159341668720405141/blob159341668750408325', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 29 Jun 2020 07:44:46 GMT',
  'ETag',
  '"0x8D81C004B3338A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba540-f01e-0065-3ce9-4d0c4b000000',
  'x-ms-client-request-id',
  'c0348608-e0c6-4d84-b1b5-6f7317396a54',
  'x-ms-version',
  '2019-07-07',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:52.6476838Z',
  'Date',
  'Mon, 29 Jun 2020 07:44:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159341668720405141/blob159341668750408325')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 29 Jun 2020 07:44:46 GMT',
  'ETag',
  '"0x8D81C004B3338A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba620-f01e-0065-7be9-4d0c4b000000',
  'x-ms-client-request-id',
  '9c3d9229-9ff4-4268-9b2c-4bcdaabb4ad1',
  'x-ms-version',
  '2019-07-07',
  'x-ms-snapshot',
  '2020-06-29T07:44:46.3113040Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Mon, 29 Jun 2020 07:44:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159341668720405141/blob159341668750408325')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 29 Jun 2020 07:44:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81C004B3338A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba6d0-f01e-0065-17e9-4d0c4b000000',
  'x-ms-client-request-id',
  '6ee873d9-8f11-4e4c-8afe-db6646f93400',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Mon, 29 Jun 2020 07:44:46 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 29 Jun 2020 07:44:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668720405141/blob159341668750408325')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba764-f01e-0065-19e9-4d0c4b000000',
  'x-ms-client-request-id',
  '51cdc4c9-4e36-4833-ab02-365350c8f6c5',
  'x-ms-version',
  '2019-07-07',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Mon, 29 Jun 2020 07:44:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668720405141/blob159341668750408325')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.\nRequestId:148ba85b-f01e-0065-77e9-4d0c4b000000\nTime:2020-06-29T07:44:47.2845453Z</Message></Error>", [
  'Content-Length',
  '215',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba85b-f01e-0065-77e9-4d0c4b000000',
  'x-ms-client-request-id',
  'feede690-2f09-4ef5-9db9-2af18c4d3705',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'BlobNotFound',
  'Date',
  'Mon, 29 Jun 2020 07:44:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668720405141/blob159341668750408325')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba91b-f01e-0065-21e9-4d0c4b000000',
  'x-ms-client-request-id',
  'b3bf741f-2d57-4812-a610-79316ed2929d',
  'x-ms-version',
  '2019-07-07',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 29 Jun 2020 07:44:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159341668720405141')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159341668720405141\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148ba9c5-f01e-0065-3de9-4d0c4b000000',
  'x-ms-client-request-id',
  '92e8186a-6091-4216-ae21-1a3fec576f8f',
  'x-ms-version',
  '2019-07-07',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 29 Jun 2020 07:44:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159341668720405141')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '148baab9-f01e-0065-17e9-4d0c4b000000',
  'x-ms-client-request-id',
  '490a55e5-67a5-4ba7-abe9-4bd305bfad19',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 29 Jun 2020 07:44:47 GMT'
]);
