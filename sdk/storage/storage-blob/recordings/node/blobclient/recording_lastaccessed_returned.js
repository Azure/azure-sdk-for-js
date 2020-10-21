let nock = require('nock');

module.exports.hash = "554a9260d6af406d03e8b94e399b0b50";

module.exports.testInfo = {"uniqueName":{"container":"container160248070036307761","blob":"blob160248070171605025"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160248070036307761')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'ETag',
  '"0x8D86E70197A483F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be4576a-901e-0016-5558-a03c66000000',
  'x-ms-client-request-id',
  '70237b34-ae1c-4f71-a825-fbe844fe537a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 05:31:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160248070036307761/blob160248070171605025', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'ETag',
  '"0x8D86E7019AAC2FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be45779-901e-0016-5958-a03c66000000',
  'x-ms-client-request-id',
  '68e00b27-3a66-40cf-ad47-5447a9d90c7e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-12T05:31:41.8939133Z',
  'Date',
  'Mon, 12 Oct 2020 05:31:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160248070036307761/blob160248070171605025')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86E7019AAC2FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be45781-901e-0016-6058-a03c66000000',
  'x-ms-client-request-id',
  '4eea2cca-8a7f-4734-a27e-667b7fc3e456',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-12T05:31:41.8939133Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-last-access-time',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,x-ms-last-access-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 12 Oct 2020 05:31:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160248070036307761/blob160248070171605025')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86E7019AAC2FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be45789-901e-0016-6658-a03c66000000',
  'x-ms-client-request-id',
  'cc753c9e-80ce-4212-bbaa-aec051ec1cb9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-12T05:31:41.8939133Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 12 Oct 2020 05:31:41 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-last-access-time',
  'Mon, 12 Oct 2020 05:31:42 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-last-access-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 12 Oct 2020 05:31:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160248070036307761')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160248070036307761\"><Prefix>blob160248070171605025</Prefix><Blobs><Blob><Name>blob160248070171605025</Name><VersionId>2020-10-12T05:31:41.8939133Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 12 Oct 2020 05:31:41 GMT</Creation-Time><Last-Modified>Mon, 12 Oct 2020 05:31:41 GMT</Last-Modified><Etag>0x8D86E7019AAC2FD</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><LastAccessTime>Mon, 12 Oct 2020 05:31:42 GMT</LastAccessTime><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be45792-901e-0016-6d58-a03c66000000',
  'x-ms-client-request-id',
  'e6f76fa9-fe57-4fb5-a12f-c7f0cfdde992',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 12 Oct 2020 05:31:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160248070036307761')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6be4579b-901e-0016-7458-a03c66000000',
  'x-ms-client-request-id',
  '834ad9e6-c56f-4681-8c2a-6876d8fd5a82',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 12 Oct 2020 05:31:43 GMT'
]);
