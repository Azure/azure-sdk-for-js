let nock = require('nock');

module.exports.hash = "418d2dead90d038009be0c18a35991ca";

module.exports.testInfo = {"uniqueName":{"container":"container163685820337308905","blockblob/0":"blockblob/0163685820517400059","blockblob/1":"blockblob/1163685820584403248","blockblob/2":"blockblob/2163685820608807626"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163685820337308905')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Sun, 14 Nov 2021 02:50:05 GMT',
  'ETag',
  '"0x8D9A719768214AB"',
  'x-ms-request-id',
  '27eb6d2c-801e-0006-1b02-d9fe8b000000',
  'x-ms-client-request-id',
  'fd477e5b-43ab-4c5c-a2dc-624f7339263a',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Sun, 14 Nov 2021 02:50:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163685820337308905/blockblob%2F0163685820517400059')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Nov 2021 02:50:05 GMT',
  'ETag',
  '"0x8D9A71976DF244B"',
  'x-ms-request-id',
  '27eb6d2f-801e-0006-1c02-d9fe8b000000',
  'x-ms-client-request-id',
  'b51d08a4-5518-4c84-8815-8ae73171040a',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Nov 2021 02:50:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163685820337308905/blockblob%2F1163685820584403248')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Nov 2021 02:50:06 GMT',
  'ETag',
  '"0x8D9A719771269CA"',
  'x-ms-request-id',
  '27eb6d30-801e-0006-1d02-d9fe8b000000',
  'x-ms-client-request-id',
  '3c89015e-c893-4078-a616-61b6496e22dd',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Nov 2021 02:50:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163685820337308905/blockblob%2F2163685820608807626')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 14 Nov 2021 02:50:06 GMT',
  'ETag',
  '"0x8D9A7197737591A"',
  'x-ms-request-id',
  '27eb6d31-801e-0006-1e02-d9fe8b000000',
  'x-ms-client-request-id',
  '06461215-9110-4add-a27d-6ba2d899813f',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Nov 2021 02:50:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163685820337308905')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163685820337308905\"><Blobs><Blob><Name>blockblob/0163685820517400059</Name><Properties><Creation-Time>Sun, 14 Nov 2021 02:50:05 GMT</Creation-Time><Last-Modified>Sun, 14 Nov 2021 02:50:05 GMT</Last-Modified><Etag>0x8D9A71976DF244B</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/1163685820584403248</Name><Properties><Creation-Time>Sun, 14 Nov 2021 02:50:06 GMT</Creation-Time><Last-Modified>Sun, 14 Nov 2021 02:50:06 GMT</Last-Modified><Etag>0x8D9A719771269CA</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/2163685820608807626</Name><Properties><Creation-Time>Sun, 14 Nov 2021 02:50:06 GMT</Creation-Time><Last-Modified>Sun, 14 Nov 2021 02:50:06 GMT</Last-Modified><Etag>0x8D9A7197737591A</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '27eb6d32-801e-0006-1f02-d9fe8b000000',
  'x-ms-client-request-id',
  '181a96b2-3c54-4674-b4c5-d38057dabd3e',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Sun, 14 Nov 2021 02:50:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163685820337308905/blockblob%2F0163685820517400059')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '27eb6d33-801e-0006-2002-d9fe8b000000',
  'x-ms-client-request-id',
  'a7e14c24-3366-4103-be0a-08b5e0b6a355',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sun, 14 Nov 2021 02:50:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163685820337308905/blockblob%2F1163685820584403248')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '27eb6d34-801e-0006-2102-d9fe8b000000',
  'x-ms-client-request-id',
  '81f54172-dfe0-4341-bfcc-72798b52a2fd',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sun, 14 Nov 2021 02:50:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163685820337308905/blockblob%2F2163685820608807626')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '27eb6d35-801e-0006-2202-d9fe8b000000',
  'x-ms-client-request-id',
  '3b834425-f69e-4cfb-95a4-f59a06c6206d',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Sun, 14 Nov 2021 02:50:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163685820337308905')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '27eb6d36-801e-0006-2302-d9fe8b000000',
  'x-ms-client-request-id',
  '9108fc37-a6bf-4885-9bb6-3c31561c47ed',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Sun, 14 Nov 2021 02:50:07 GMT'
]);
