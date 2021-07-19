let nock = require('nock');

module.exports.hash = "d6b285a0b6c6ccf69e74161b4b1ecc0a";

module.exports.testInfo = {"uniqueName":{"container":"container162504386846700099","blockblob":"blockblob162504386965705130"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162504386846700099')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 30 Jun 2021 09:04:29 GMT',
  'ETag',
  '"0x8D93BA611989263"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5970099-301e-003f-4f8e-6d1261000000',
  'x-ms-client-request-id',
  'ee6a9e8d-969b-4d69-946b-f476f33206fd',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Wed, 30 Jun 2021 09:04:29 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162504386846700099/blockblob162504386965705130')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 30 Jun 2021 09:04:30 GMT',
  'ETag',
  '"0x8D93BA6123FA876"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00928b34-301e-0096-188e-6dd313000000',
  'x-ms-client-request-id',
  '9507090e-f247-472a-a0af-74c8ab5103de',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-30T09:04:30.6407542Z',
  'Date',
  'Wed, 30 Jun 2021 09:04:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162504386846700099/blockblob162504386965705130')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '236172bc-101e-0081-7b8e-6d7a18000000',
  'x-ms-client-request-id',
  'a610e301-6164-47f7-ba15-3c6d37520653',
  'x-ms-version',
  '2020-10-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 30 Jun 2021 09:04:31 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container162504386846700099')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container162504386846700099\"><Blobs><Blob><Name>blockblob162504386965705130</Name><HasVersionsOnly>true</HasVersionsOnly><Properties><Creation-Time>Wed, 30 Jun 2021 09:04:30 GMT</Creation-Time><Last-Modified>Wed, 30 Jun 2021 09:04:30 GMT</Last-Modified><Etag>0x8D93BA6123FA876</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><LastAccessTime>Wed, 30 Jun 2021 09:04:30 GMT</LastAccessTime><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27c0cdbb-a01e-0012-068e-6da112000000',
  'x-ms-client-request-id',
  'e490b309-032d-43a5-a4fe-0a527fbf783d',
  'x-ms-version',
  '2020-10-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Jun 2021 09:04:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162504386846700099')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d764197-801e-0058-5c8e-6d029d000000',
  'x-ms-client-request-id',
  '6319a106-7612-41db-b384-f9e0eb581999',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Wed, 30 Jun 2021 09:04:33 GMT',
  'Connection',
  'close'
]);
