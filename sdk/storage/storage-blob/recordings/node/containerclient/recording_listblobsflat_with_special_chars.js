let nock = require('nock');

module.exports.hash = "f8306cff267e3c7a75e734f991cfcd79";

module.exports.testInfo = {"uniqueName":{"container":"container163685820796900890"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163685820796900890')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 14 Nov 2021 02:50:08 GMT',
  'ETag',
  '"0x8D9A7197856381C"',
  'x-ms-request-id',
  '27eb6d37-801e-0006-2402-d9fe8b000000',
  'x-ms-client-request-id',
  'c463162d-aab9-41b3-aea2-1be1be8885ae',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Sun, 14 Nov 2021 02:50:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163685820796900890/dir1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Nov 2021 02:50:08 GMT',
  'ETag',
  '"0x8D9A719787DBB3D"',
  'x-ms-request-id',
  '27eb6d39-801e-0006-2502-d9fe8b000000',
  'x-ms-client-request-id',
  '05220421-9283-45a7-8263-16583f9ff4b1',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Nov 2021 02:50:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163685820796900890')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163685820796900890\"><Blobs><Blob><Name Encoded=\"true\">dir1%2Fdir2%2Ffile%EF%BF%BF.blob</Name><Properties><Creation-Time>Sun, 14 Nov 2021 02:50:08 GMT</Creation-Time><Last-Modified>Sun, 14 Nov 2021 02:50:08 GMT</Last-Modified><Etag>0x8D9A719787DBB3D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '27eb6d3a-801e-0006-2602-d9fe8b000000',
  'x-ms-client-request-id',
  '7c3a89c2-efda-4c52-9a38-0e456d4d1398',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Sun, 14 Nov 2021 02:50:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163685820796900890/dir1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '27eb6d3b-801e-0006-2702-d9fe8b000000',
  'x-ms-client-request-id',
  'be9b20ba-3717-43d2-a144-6c29e309b2cc',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sun, 14 Nov 2021 02:50:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163685820796900890')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '27eb6d3c-801e-0006-2802-d9fe8b000000',
  'x-ms-client-request-id',
  '59a9d518-0e37-4921-a847-81302013d230',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Sun, 14 Nov 2021 02:50:08 GMT'
]);
