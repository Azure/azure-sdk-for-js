let nock = require('nock');

module.exports.hash = "94ae9329986f08b10e9a8a98b795f4cc";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485947387101823","blobsource":"blobsource162485947387103767"},"newDate":{"aDayLater":"2021-06-28T05:51:14.164Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blobsource162485947387103767', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'ETag',
  '"0x8D939F8BD70161D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9478c-101e-001b-7ae1-6b45f9000000',
  'x-ms-client-request-id',
  '09b46d18-b382-4901-8639-7419c18eebbf',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:51:14.2547997Z',
  'Date',
  'Mon, 28 Jun 2021 05:51:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485947387101823')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'ETag',
  '"0x8D939F8BD9D30CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9478f-101e-001b-7de1-6b45f9000000',
  'x-ms-client-request-id',
  'e39c3dce-0e7a-4533-b4af-fc32ee8c3c84',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2021-06-28T05:51:14.5586283Z',
  'x-ms-copy-id',
  'c53e4b01-4fcf-4f38-bed8-f4599bd79578',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 28 Jun 2021 05:51:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485947387101823')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8BD9D30CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94792-101e-001b-80e1-6b45f9000000',
  'x-ms-client-request-id',
  'bbdd5c80-a38b-4e4b-9a96-4806ac993bd6',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:51:14.5586283Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-legal-hold',
  'true',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'c53e4b01-4fcf-4f38-bed8-f4599bd79578',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/fakecontainername/blobsource162485947387103767?sv=2020-10-02&se=2021-06-29T05%3A51%3A14Z&sr=b&sp=r&sig=TkiBQKSsbegYbZdjc4ZpjUsJRMsLEqDHZOZo7MW3Dfg%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-legal-hold,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:51:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485947387101823</Name><VersionId>2021-06-28T05:51:14.5586283Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:51:14 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:51:14 GMT</Last-Modified><Etag>0x8D939F8BD9D30CF</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>YeJLfssylmU=</Content-CRC64><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blobsource162485947387103767</Name><VersionId>2021-06-28T05:51:14.2547997Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:51:14 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:51:14 GMT</Last-Modified><Etag>0x8D939F8BD70161D</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94796-101e-001b-04e1-6b45f9000000',
  'x-ms-client-request-id',
  'a6c1b3ca-07cf-4808-bf7c-731aababe71e',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:51:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485947387101823')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada9479a-101e-001b-07e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '09116b65-2a5d-4a33-ac5f-0b5c7792e544',
  'Date',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485947387101823')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9479f-101e-001b-0ae1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'b6dc957f-889c-4441-858f-c02816502c83',
  'Date',
  'Mon, 28 Jun 2021 05:51:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485947387101823')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada947a1-101e-001b-0ce1-6b45f9000000',
  'x-ms-client-request-id',
  '9eb5451a-e9ba-41b2-8869-c75ff8fe2693',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:51:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blobsource162485947387103767')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada947a6-101e-001b-11e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'b257995d-3d27-4713-b1c1-07086d0a28b2',
  'Date',
  'Mon, 28 Jun 2021 05:51:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blobsource162485947387103767')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada947b0-101e-001b-14e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'fb6869bd-e906-4d31-81a2-d633fbdc79e8',
  'Date',
  'Mon, 28 Jun 2021 05:51:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blobsource162485947387103767')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada947b3-101e-001b-17e1-6b45f9000000',
  'x-ms-client-request-id',
  'e6c5262b-51cb-4713-bdb7-e783f0869c8f',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:51:15 GMT'
]);
