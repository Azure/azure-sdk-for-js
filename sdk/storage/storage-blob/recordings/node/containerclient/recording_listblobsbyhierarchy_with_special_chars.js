let nock = require('nock');

module.exports.hash = "762865f4930297f2a92be2425d081f11";

module.exports.testInfo = {"uniqueName":{"container":"container163841191727006884"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFB6A4DCA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597be56-f01e-0031-6d23-e705aa000000',
  'x-ms-client-request-id',
  'd127e1ac-c392-4bb6-8410-bfa896b510de',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 02 Dec 2021 02:25:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884/first_dir%EF%BF%BF%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFB803C6E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597be80-f01e-0031-1323-e705aa000000',
  'x-ms-client-request-id',
  '0db9977a-e26e-4524-b56f-f967e0a6da60',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 02 Dec 2021 02:25:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884/second_dir%EF%BF%BF%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFB9102D0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597be93-f01e-0031-2223-e705aa000000',
  'x-ms-client-request-id',
  '53533a13-0e1b-4a8d-ac17-398caf011c01',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884/normal_dir%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFBA1F03F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597bea6-f01e-0031-3423-e705aa000000',
  'x-ms-client-request-id',
  '194f9cb9-b0c7-4ea5-be45-2aafcd1448f2',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884/first_file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFBB379D5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597beb0-f01e-0031-3e23-e705aa000000',
  'x-ms-client-request-id',
  '731dc9eb-cea5-4ee0-9f2f-72886a47dda4',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884/second_file%EF%BF%BF.blob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFBC4403C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597bec1-f01e-0031-4b23-e705aa000000',
  'x-ms-client-request-id',
  'de8404d6-0581-4b8e-8cc8-1afcbf7be92e',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163841191727006884/NormalBlob')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 02 Dec 2021 02:25:18 GMT',
  'ETag',
  '"0x8D9B53AFBD52DA5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597bec8-f01e-0031-5123-e705aa000000',
  'x-ms-client-request-id',
  '8a098e8c-9c2d-4575-b9f3-334e8005f3c3',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163841191727006884')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163841191727006884\"><Delimiter>/</Delimiter><Blobs><Blob><Name>NormalBlob</Name><Properties><Creation-Time>Thu, 02 Dec 2021 02:25:18 GMT</Creation-Time><Last-Modified>Thu, 02 Dec 2021 02:25:18 GMT</Last-Modified><Etag>0x8D9B53AFBD52DA5</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><BlobPrefix><Name Encoded=\"true\">first_dir%EF%BF%BF%2F</Name></BlobPrefix><Blob><Name Encoded=\"true\">first_file%EF%BF%BF.blob</Name><Properties><Creation-Time>Thu, 02 Dec 2021 02:25:18 GMT</Creation-Time><Last-Modified>Thu, 02 Dec 2021 02:25:18 GMT</Last-Modified><Etag>0x8D9B53AFBB379D5</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><BlobPrefix><Name>normal_dir/</Name></BlobPrefix><BlobPrefix><Name Encoded=\"true\">second_dir%EF%BF%BF%2F</Name></BlobPrefix><Blob><Name Encoded=\"true\">second_file%EF%BF%BF.blob</Name><Properties><Creation-Time>Thu, 02 Dec 2021 02:25:18 GMT</Creation-Time><Last-Modified>Thu, 02 Dec 2021 02:25:18 GMT</Last-Modified><Etag>0x8D9B53AFBC4403C</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597bed1-f01e-0031-5923-e705aa000000',
  'x-ms-client-request-id',
  '3344c12c-211d-4c7a-b1a4-852b4512b16c',
  'x-ms-version',
  '2021-02-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163841191727006884')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5597bee2-f01e-0031-6a23-e705aa000000',
  'x-ms-client-request-id',
  '456e173a-0527-4587-a333-6f1effa8c492',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 02 Dec 2021 02:25:18 GMT'
]);
