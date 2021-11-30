let nock = require('nock');

module.exports.hash = "7c9aa9f5249cbba9c287d6e2fbe1c27c";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485943615406859"},"newDate":{"minutesLater":"2021-06-28T05:50:37.555Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485943615406859', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:37 GMT',
  'ETag',
  '"0x8D939F8A79BCF04"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94580-101e-001b-6be1-6b45f9000000',
  'x-ms-client-request-id',
  'dde56d07-2bbb-48ee-a719-b9465fb58d10',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:50:37.6314628Z',
  'Date',
  'Mon, 28 Jun 2021 05:50:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485943615406859')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:37 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-request-id',
  'ada94584-101e-001b-6ee1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '4a9eb6df-2a12-4d43-9252-aca1304f198f',
  'Date',
  'Mon, 28 Jun 2021 05:50:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485943615406859')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8A79BCF04"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94587-101e-001b-70e1-6b45f9000000',
  'x-ms-client-request-id',
  '2689562f-9dbc-478f-a3c7-e08f6477c954',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:37.6314628Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:37 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:37 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485943615406859</Name><VersionId>2021-06-28T05:50:37.6314628Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:37 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:37 GMT</Last-Modified><Etag>0x8D939F8A79BCF04</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Mon, 28 Jun 2021 05:55:37 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9458c-101e-001b-73e1-6b45f9000000',
  'x-ms-client-request-id',
  'd0e6b723-4b2d-4279-a2be-588827c60855',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername/blob162485943615406859')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8A79BCF04"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9458f-101e-001b-76e1-6b45f9000000',
  'x-ms-client-request-id',
  'a80ea148-03d0-4bbd-a8fb-9fc18a284df6',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:37.6314628Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:37 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:37 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485943615406859</Name><VersionId>2021-06-28T05:50:37.6314628Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:37 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:37 GMT</Last-Modified><Etag>0x8D939F8A79BCF04</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94594-101e-001b-78e1-6b45f9000000',
  'x-ms-client-request-id',
  '4c5005d2-11d7-480d-9526-db541e8d5dfa',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485943615406859')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada94598-101e-001b-7be1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '417d1453-646d-40e0-b217-0e6df2ef0a2b',
  'Date',
  'Mon, 28 Jun 2021 05:50:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485943615406859')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9459d-101e-001b-7fe1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '305d3bf3-8dc0-43e8-9df0-164145ddd5b7',
  'Date',
  'Mon, 28 Jun 2021 05:50:39 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485943615406859')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945a1-101e-001b-01e1-6b45f9000000',
  'x-ms-client-request-id',
  '168f1db4-abf4-412e-8fb5-f4d75d4455f0',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:50:39 GMT'
]);
