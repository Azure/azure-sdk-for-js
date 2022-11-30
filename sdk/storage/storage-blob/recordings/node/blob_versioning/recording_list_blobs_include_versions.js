let nock = require('nock');

module.exports.hash = "7154a4d9a0b712caa81a682435862b6d";

module.exports.testInfo = {"uniqueName":{"container":"container165899993672202712","blob":"blob165899993735509030","blockblob/0":"blockblob/0165899993758208152","blockblob/1":"blockblob/1165899993768600784"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899993672202712')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:18:57 GMT',
  'ETag',
  '"0x8DA707A334A3AE1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4bd0-901e-0055-4c63-a2f432000000',
  'x-ms-client-request-id',
  'a14e67b1-236e-4874-b025-e721f644391d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899993672202712/blob165899993735509030', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:18:57 GMT',
  'ETag',
  '"0x8DA707A335F6195"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4bea-901e-0055-6163-a2f432000000',
  'x-ms-client-request-id',
  'cdaef129-e1d3-418f-865c-ba89886fb8fb',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2022-07-28T09:18:57.6556437Z',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899993672202712/blob165899993735509030')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:18:57 GMT',
  'ETag',
  '"0x8DA707A337027E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4bf4-901e-0055-6963-a2f432000000',
  'x-ms-client-request-id',
  '9e4bc27f-6048-4b21-a775-b78755c42a71',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2022-07-28T09:18:57.7665778Z',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899993672202712/blockblob/0165899993758208152')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:18:57 GMT',
  'ETag',
  '"0x8DA707A33802AF3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4c0a-901e-0055-7963-a2f432000000',
  'x-ms-client-request-id',
  '0fba4118-845b-4968-a65b-97d03e30c6c9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2022-07-28T09:18:57.8705139Z',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899993672202712/blockblob/1165899993768600784')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:18:57 GMT',
  'ETag',
  '"0x8DA707A338FE001"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4c10-901e-0055-7f63-a2f432000000',
  'x-ms-client-request-id',
  'd5420d25-6c5f-4c2e-b48b-5daad3f06913',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2022-07-28T09:18:57.9744509Z',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899993672202712')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899993672202712\"><Blobs><Blob><Name>blob165899993735509030</Name><VersionId>2022-07-28T09:18:57.6556437Z</VersionId><Properties><Creation-Time>Thu, 28 Jul 2022 09:18:57 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:18:57 GMT</Last-Modified><Etag>0x8DA707A335F6195</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blob165899993735509030</Name><VersionId>2022-07-28T09:18:57.7665778Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 28 Jul 2022 09:18:57 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:18:57 GMT</Last-Modified><Etag>0x8DA707A337027E2</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/0165899993758208152</Name><VersionId>2022-07-28T09:18:57.8705139Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 28 Jul 2022 09:18:57 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:18:57 GMT</Last-Modified><Etag>0x8DA707A33802AF3</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/1165899993768600784</Name><VersionId>2022-07-28T09:18:57.9744509Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 28 Jul 2022 09:18:57 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:18:57 GMT</Last-Modified><Etag>0x8DA707A338FE001</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4c2c-901e-0055-1863-a2f432000000',
  'x-ms-client-request-id',
  '9d2e2115-577c-42f7-ba40-f741935985b1',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899993672202712')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '196f4c4e-901e-0055-3463-a2f432000000',
  'x-ms-client-request-id',
  '599a815c-83da-423b-b8fd-e907d02419a1',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:18:57 GMT'
]);
