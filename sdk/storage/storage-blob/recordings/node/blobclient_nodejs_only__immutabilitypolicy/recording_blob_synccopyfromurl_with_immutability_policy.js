let nock = require('nock');

module.exports.hash = "446d475b27579973f8a1192ccfc10aa5";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485947070707461","blobsource":"blobsource162485947070707188"},"newDate":{"aDayLater":"2021-06-28T05:51:10.997Z","minutesLater":"2021-06-28T05:51:10.997Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blobsource162485947070707188', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'ETag',
  '"0x8D939F8BB8D1CF2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94759-101e-001b-4fe1-6b45f9000000',
  'x-ms-client-request-id',
  '6111b833-435e-4dd5-af85-cbcad0ccb075',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:51:11.0895858Z',
  'Date',
  'Mon, 28 Jun 2021 05:51:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485947070707461')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'ETag',
  '"0x8D939F8BBD1DAA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9475a-101e-001b-50e1-6b45f9000000',
  'x-ms-client-request-id',
  '71e6e921-945d-4b8d-83c5-c217ea9b3a41',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2021-06-28T05:51:11.5743121Z',
  'x-ms-copy-id',
  'b3d12aaf-a60f-4a0b-ae95-32bb9568162b',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 28 Jun 2021 05:51:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485947070707461')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8BBD1DAA0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9475e-101e-001b-54e1-6b45f9000000',
  'x-ms-client-request-id',
  '3d501dd7-a4a5-4944-98e3-655d2ca969a6',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:51:11.5743121Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:56:10 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'b3d12aaf-a60f-4a0b-ae95-32bb9568162b',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/fakecontainername/blobsource162485947070707188?sv=2020-10-02&se=2021-06-29T05%3A51%3A10Z&sr=b&sp=r&sig=lBBC1e%2BrJEnCrLOlk5ikBMtcDURKXLn%2Fhc%2Fq%2BGyZ2OM%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:51:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485947070707461</Name><VersionId>2021-06-28T05:51:11.5743121Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:51:11 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:51:11 GMT</Last-Modified><Etag>0x8D939F8BBD1DAA0</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>YeJLfssylmU=</Content-CRC64><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Mon, 28 Jun 2021 05:56:10 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob><Blob><Name>blobsource162485947070707188</Name><VersionId>2021-06-28T05:51:11.0895858Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:51:11 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:51:11 GMT</Last-Modified><Etag>0x8D939F8BB8D1CF2</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94764-101e-001b-5ae1-6b45f9000000',
  'x-ms-client-request-id',
  '13ee2d0d-2de7-466f-b5fc-a2972f5ff58c',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:51:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485947070707461')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada9476a-101e-001b-60e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '6dc532ed-a36c-4247-a265-c60b3a3d2fec',
  'Date',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485947070707461')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9476f-101e-001b-65e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '13a799d6-90dc-40f5-b475-35ac8465b3d5',
  'Date',
  'Mon, 28 Jun 2021 05:51:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485947070707461')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94779-101e-001b-6ee1-6b45f9000000',
  'x-ms-client-request-id',
  'd940877d-9140-4f12-9eab-7c4e14fe513f',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:51:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blobsource162485947070707188')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada94782-101e-001b-70e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'f248a617-b3e9-4ade-b5ac-911acf967c17',
  'Date',
  'Mon, 28 Jun 2021 05:51:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blobsource162485947070707188')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94785-101e-001b-73e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '492d1636-cf58-457a-b87f-6a06076a6d36',
  'Date',
  'Mon, 28 Jun 2021 05:51:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blobsource162485947070707188')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94787-101e-001b-75e1-6b45f9000000',
  'x-ms-client-request-id',
  'fdc35128-8f58-4bbc-9db8-94664f07f6b5',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:51:13 GMT'
]);
