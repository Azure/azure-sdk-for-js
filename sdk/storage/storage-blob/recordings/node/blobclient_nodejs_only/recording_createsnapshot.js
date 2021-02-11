let nock = require('nock');

module.exports.hash = "b0abf68009e71f2b39e8e49256067f0f";

module.exports.testInfo = {"uniqueName":{"container":"container159210827844904617","blob":"blob159210827846502596"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827844904617')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB86A080"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309857-201e-003e-1102-42dadf000000',
  'x-ms-client-request-id',
  '017235dc-6fa5-4911-9766-cdc061886a86',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827844904617/blob159210827846502596', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB897C21"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130985b-201e-003e-1402-42dadf000000',
  'x-ms-client-request-id',
  '6ac20f90-657e-4fff-a05e-fe8d207af407',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:58.4807969Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827844904617/blob159210827846502596')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'ETag',
  '"0x8D81019EB897C21"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130985e-201e-003e-1702-42dadf000000',
  'x-ms-client-request-id',
  'c02645c6-8648-4021-861f-bca257cf1691',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:58.4988075Z',
  'x-ms-snapshot',
  '2020-06-14T04:17:58.4978075Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827844904617/blob159210827846502596')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB897C21"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309867-201e-003e-1f02-42dadf000000',
  'x-ms-client-request-id',
  'fe6b960d-f13f-4a5c-a2a2-c2b363dbb9e7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:58 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827844904617')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159210827844904617\"><Blobs><Blob><Name>blob159210827846502596</Name><Snapshot>2020-06-14T04:17:58.4978075Z</Snapshot><Properties><Creation-Time>Sun, 14 Jun 2020 04:17:58 GMT</Creation-Time><Last-Modified>Sun, 14 Jun 2020 04:17:58 GMT</Last-Modified><Etag>0x8D81019EB897C21</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blob159210827846502596</Name><VersionId>2020-06-14T04:17:58.4988075Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Sun, 14 Jun 2020 04:17:58 GMT</Creation-Time><Last-Modified>Sun, 14 Jun 2020 04:17:58 GMT</Last-Modified><Etag>0x8D81019EB897C21</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130986b-201e-003e-2302-42dadf000000',
  'x-ms-client-request-id',
  'ed1a2048-b810-4f16-90d2-cda128076609',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827844904617')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309871-201e-003e-2902-42dadf000000',
  'x-ms-client-request-id',
  '9ee859ad-c708-4504-b75a-8f259c725eb3',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:57 GMT'
]);
