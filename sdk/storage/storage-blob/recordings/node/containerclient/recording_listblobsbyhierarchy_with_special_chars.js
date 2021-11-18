let nock = require('nock');

module.exports.hash = "52e574a818274dc0b4c5eb589cf622ae";

module.exports.testInfo = {"uniqueName":{"container":"container163659987895603524"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659987895603524')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:39 GMT',
  'ETag',
  '"0x8D9A4C0008A93FB"',
  'x-ms-request-id',
  '9a4dfe06-601e-0008-57a8-d65c96000000',
  'x-ms-client-request-id',
  'df8464e4-875e-4f1c-a014-51bddbe9a91d',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 11 Nov 2021 03:04:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659987895603524/dir%EF%BF%BF1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:40 GMT',
  'ETag',
  '"0x8D9A4C0011B965E"',
  'x-ms-request-id',
  'bf191a8e-301e-0005-32a8-d6838d000000',
  'x-ms-client-request-id',
  '47e98eb6-7272-49f4-a01b-b7451d6f2d0d',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659987895603524/NormalBlob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:41 GMT',
  'ETag',
  '"0x8D9A4C001ACB4AE"',
  'x-ms-request-id',
  '62538e95-f01e-0009-39a8-d67794000000',
  'x-ms-client-request-id',
  '200861f1-3161-4fc6-9a87-7586dfefb639',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659987895603524/file%EF%BF%BF.blob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:42 GMT',
  'ETag',
  '"0x8D9A4C0023EE2DB"',
  'x-ms-request-id',
  '2863ba45-e01e-0000-34a8-d60487000000',
  'x-ms-client-request-id',
  '14c5f4ce-b671-4d58-a38a-a3e8262285e5',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:41 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659987895603524/dir%2FNormalBlob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:43 GMT',
  'ETag',
  '"0x8D9A4C002CF8919"',
  'x-ms-request-id',
  '842600af-501e-0003-2da8-d67981000000',
  'x-ms-client-request-id',
  '7e0cb632-6d64-4515-b40b-5e62c5aab965',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:43 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163659987895603524')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163659987895603524\"><Delimiter>/</Delimiter><Blobs><Blob><Name>NormalBlob</Name><Properties><Creation-Time>Thu, 11 Nov 2021 03:04:41 GMT</Creation-Time><Last-Modified>Thu, 11 Nov 2021 03:04:41 GMT</Last-Modified><Etag>0x8D9A4C001ACB4AE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><BlobPrefix><Name>dir/</Name></BlobPrefix><BlobPrefix><Name Encoded=\"true\">dir%EF%BF%BF1%2F</Name></BlobPrefix><Blob><Name Encoded=\"true\">file%EF%BF%BF.blob</Name><Properties><Creation-Time>Thu, 11 Nov 2021 03:04:42 GMT</Creation-Time><Last-Modified>Thu, 11 Nov 2021 03:04:42 GMT</Last-Modified><Etag>0x8D9A4C0023EE2DB</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '62538e97-f01e-0009-3ba8-d67794000000',
  'x-ms-client-request-id',
  '055b27bb-0675-4285-adf0-9df87d6c9454',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 11 Nov 2021 03:04:44 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163659987895603524/dir%EF%BF%BF1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '842600b0-501e-0003-2ea8-d67981000000',
  'x-ms-client-request-id',
  'd72282ba-8322-445c-a14c-e84b2d9b49a5',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 11 Nov 2021 03:04:44 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163659987895603524')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '2863ba4b-e01e-0000-39a8-d60487000000',
  'x-ms-client-request-id',
  '0a0df758-a971-4333-a47e-213f81c04cf2',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 11 Nov 2021 03:04:46 GMT',
  'Connection',
  'close'
]);
