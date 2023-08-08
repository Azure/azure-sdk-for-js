let nock = require('nock');

module.exports.hash = "aa4f30f687a3582ec31b1c233126c21b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154752276207698","file0":"file0169154752288804806","file1":"file1169154752300800417"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752276207698')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:42 GMT',
  'ETag',
  '"0x8DB987EF38C2D30"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26c92-101e-002e-1467-caab16000000',
  'x-ms-client-request-id',
  '106cf247-2c66-4003-8245-2a8313d05aa4',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752276207698/file0169154752288804806')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:42 GMT',
  'ETag',
  '"0x8DB987EF3A0E4FB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673fab-f01f-0054-4167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '81ba120d-7ca6-46e2-a990-15d10acc733c',
  'Date',
  'Wed, 09 Aug 2023 02:18:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154752276207698/file1169154752300800417')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:42 GMT',
  'ETag',
  '"0x8DB987EF3B2A523"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673fae-f01f-0054-4467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4d281d52-6b18-4771-ac89-1b64ff0ce176',
  'Date',
  'Wed, 09 Aug 2023 02:18:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752276207698/file0169154752288804806')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211226178627',
  'x-ms-request-id',
  'f1673fb0-f01f-0054-4667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6d6f4d72-de20-4c68-bbc3-5a373783679b',
  'Date',
  'Wed, 09 Aug 2023 02:18:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752276207698/file1169154752300800417')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211227573739',
  'x-ms-request-id',
  'f1673fbe-f01f-0054-5267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '741e8d86-644b-4db1-a082-b9d65bf469b4',
  'Date',
  'Wed, 09 Aug 2023 02:18:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752276207698')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752276207698\"><MaxResults>1</MaxResults><Blobs><Blob><Name>file0169154752288804806</Name><DeletionId>133360211226178627</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:42 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:42 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:42 GMT</Expiry-Time><Etag>0x8DB987EF3A0E4FB</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:42 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!344!MDAwMjEyIVZCYUlyUE9QeklLZjlod1lqd0VZaVFFdlpXMXRZV1JoZEdGc1lXdGxBVEF4UkRaR1FUQXdNREU1TVRZMU16Y3ZKSFJ5WVhOb0wyWnBiR1Z6ZVhOMFpXMHhOamt4TlRRM05USXlOell5TURjMk9UZ0JNREZFT1VOQk5qZEVNVEUxTlVOQ013SXZabWxzWlRFeE5qa3hOVFEzTlRJek1EQTRNREEwTVRjQk1qQXlNeTB3T0Mwd09WUXdNam94T0RvME1pNDNOVGN6TnpNNVdoWUFBQUE9ITAwMDAyOCEyMDIzLTA4LTA5VDAyOjE4OjQyLjkxMzQ2MjZaIQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26d18-101e-002e-1267-caab16000000',
  'x-ms-client-request-id',
  'baa9f212-4b1f-4597-b5c2-b4702fc6737c',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154752276207698')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"filesystem169154752276207698\"><Marker>2!344!MDAwMjEyIVZCYUlyUE9QeklLZjlod1lqd0VZaVFFdlpXMXRZV1JoZEdGc1lXdGxBVEF4UkRaR1FUQXdNREU1TVRZMU16Y3ZKSFJ5WVhOb0wyWnBiR1Z6ZVhOMFpXMHhOamt4TlRRM05USXlOell5TURjMk9UZ0JNREZFT1VOQk5qZEVNVEUxTlVOQ013SXZabWxzWlRFeE5qa3hOVFEzTlRJek1EQTRNREEwTVRjQk1qQXlNeTB3T0Mwd09WUXdNam94T0RvME1pNDNOVGN6TnpNNVdoWUFBQUE9ITAwMDAyOCEyMDIzLTA4LTA5VDAyOjE4OjQyLjkxMzQ2MjZaIQ--</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>file1169154752300800417</Name><DeletionId>133360211227573739</DeletionId><Deleted>true</Deleted><Properties><Creation-Time>Wed, 09 Aug 2023 02:18:42 GMT</Creation-Time><Last-Modified>Wed, 09 Aug 2023 02:18:42 GMT</Last-Modified><Expiry-Time>Wed, 16 Aug 2023 02:18:42 GMT</Expiry-Time><Etag>0x8DB987EF3B2A523</Etag><ResourceType>file</ResourceType><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>AAAAAAAAAAA=</Content-CRC64><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted><DeletedTime>Wed, 09 Aug 2023 02:18:42 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26d41-101e-002e-3a67-caab16000000',
  'x-ms-client-request-id',
  '4f2ecf9d-2deb-4aa2-8337-da7425ec73c4',
  'x-ms-version',
  '2023-08-03',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154752276207698')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26d5a-101e-002e-5267-caab16000000',
  'x-ms-client-request-id',
  '3c404750-f446-4b1c-baf1-e56a74547680',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:42 GMT'
]);
