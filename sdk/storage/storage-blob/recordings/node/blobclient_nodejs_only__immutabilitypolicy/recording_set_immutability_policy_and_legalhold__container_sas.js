let nock = require('nock');

module.exports.hash = "317b0fdd093b62dcaaef06f1f65b08b1";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485946600604173"},"newDate":{"aDayLater":"2021-06-28T05:51:06.300Z","minutesLater":"2021-06-28T05:51:06.304Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485946600604173', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:06 GMT',
  'ETag',
  '"0x8D939F8B8C033AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9471e-101e-001b-1be1-6b45f9000000',
  'x-ms-client-request-id',
  '8c7f3ecd-b4f1-4610-8752-081dac0154cb',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:51:06.3912363Z',
  'Date',
  'Mon, 28 Jun 2021 05:51:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485946600604173')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:56:06 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-request-id',
  'ada94722-101e-001b-1ee1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'edfacef4-d3d3-48ee-9d0e-2596d6ce92f2',
  'Date',
  'Mon, 28 Jun 2021 05:51:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485946600604173')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'true',
  'x-ms-request-id',
  'ada94726-101e-001b-22e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'bb6b4f73-0f9c-47e2-b2bc-8df430728f2b',
  'Date',
  'Mon, 28 Jun 2021 05:51:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485946600604173')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:51:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8B8C033AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94728-101e-001b-24e1-6b45f9000000',
  'x-ms-client-request-id',
  '11cafadb-f190-4f89-ba5e-9a703cc14d7c',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:51:06.3912363Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:56:06 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-legal-hold',
  'true',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:51:06 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,x-ms-legal-hold,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:51:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485946600604173</Name><VersionId>2021-06-28T05:51:06.3912363Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:51:06 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:51:06 GMT</Last-Modified><Etag>0x8D939F8B8C033AB</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Mon, 28 Jun 2021 05:56:06 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9472b-101e-001b-27e1-6b45f9000000',
  'x-ms-client-request-id',
  '95a65300-9ce1-42ea-8647-bc9a6d0f1ab1',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:51:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485946600604173')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada9472d-101e-001b-29e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'd8d04508-0000-494d-8360-52fd06490fd7',
  'Date',
  'Mon, 28 Jun 2021 05:51:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485946600604173')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94733-101e-001b-2ee1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '8c21af39-be2a-42cd-be78-4b90507fc141',
  'Date',
  'Mon, 28 Jun 2021 05:51:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485946600604173')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94736-101e-001b-31e1-6b45f9000000',
  'x-ms-client-request-id',
  'f5c5a999-2263-462d-8a87-cd48eb90c335',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:51:07 GMT'
]);
