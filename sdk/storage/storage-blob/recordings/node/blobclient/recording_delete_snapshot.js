let nock = require('nock');

module.exports.hash = "2b301541372f4fb5ca5e004a2f14a0d3";

module.exports.testInfo = {"uniqueName":{"container":"container159210827261600382","blob":"blob159210827263107667"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827261600382')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E80CB658"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f08-201e-003e-5a02-42dadf000000',
  'x-ms-client-request-id',
  '8788f914-5e65-4185-98ff-b32eafb5320a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827261600382/blob159210827263107667', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E80F6C26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f10-201e-003e-5f02-42dadf000000',
  'x-ms-client-request-id',
  'f09daa72-47ec-409b-afc9-c1427f5b51aa',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:52.6476838Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827261600382/blob159210827263107667')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E80F6C26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f15-201e-003e-6402-42dadf000000',
  'x-ms-client-request-id',
  '5e8e9658-b411-41d1-9eca-5fe0a42f1b8a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:52.6676963Z',
  'x-ms-snapshot',
  '2020-06-14T04:17:52.6666963Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827261600382/blob159210827263107667')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E80F6C26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f1c-201e-003e-6a02-42dadf000000',
  'x-ms-client-request-id',
  '675d86b6-45ee-4c7f-ae57-c97270513d70',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827261600382/blob159210827263107667')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f1d-201e-003e-6b02-42dadf000000',
  'x-ms-client-request-id',
  '5d5b115a-9a0e-4bc9-a9f9-5f009c2b76f4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827261600382/blob159210827263107667')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f21-201e-003e-6f02-42dadf000000',
  'x-ms-client-request-id',
  'c9f86be3-0bdb-476a-9387-3598cf040aa1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827261600382')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159210827261600382\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f23-201e-003e-7102-42dadf000000',
  'x-ms-client-request-id',
  'c392433c-1185-4711-b7ef-e6c307bb2002',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827261600382')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f28-201e-003e-7602-42dadf000000',
  'x-ms-client-request-id',
  '4ebfd373-142f-4d56-8485-49ce3614d534',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);
