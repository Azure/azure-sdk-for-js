let nock = require('nock');

module.exports.hash = "88c2f1a9ef0f8b9521937257a5098e8f";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485945595802802"},"newDate":{"minutesLater":"2021-06-28T05:50:55.958Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485945595802802', "Hello World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9469a-101e-001b-2be1-6b45f9000000',
  'x-ms-client-request-id',
  '3d13deaa-5ee8-42c6-8593-dd274849b137',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Jun 2021 05:50:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485945595802802', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:56 GMT',
  'ETag',
  '"0x8D939F8B2F08BDA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9469e-101e-001b-2fe1-6b45f9000000',
  'x-ms-client-request-id',
  'de0567d5-238b-41bd-86c7-f51d2cdb2232',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'EM2NjpR6IGk=',
  'x-ms-version-id',
  '2021-06-28T05:50:56.6417370Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 28 Jun 2021 05:50:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485945595802802')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8B2F08BDA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada946a0-101e-001b-31e1-6b45f9000000',
  'x-ms-client-request-id',
  '3d382436-22a4-4214-811b-ba0255df376a',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:56.6417370Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:55 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:56 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485945595802802</Name><VersionId>2021-06-28T05:50:56.6417370Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:56 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:56 GMT</Last-Modified><Etag>0x8D939F8B2F08BDA</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada946a2-101e-001b-33e1-6b45f9000000',
  'x-ms-client-request-id',
  'e294e9e9-ce15-47e3-bd97-9bc3e961185b',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485945595802802')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada946a8-101e-001b-39e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '542e098f-6cc2-4ad1-ba51-601382d736e1',
  'Date',
  'Mon, 28 Jun 2021 05:50:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485945595802802')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada946aa-101e-001b-3be1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '0c625dec-86ef-4261-b361-e69b410d3a37',
  'Date',
  'Mon, 28 Jun 2021 05:50:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485945595802802')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada946ae-101e-001b-3ee1-6b45f9000000',
  'x-ms-client-request-id',
  'f93d75a3-91ad-4e06-86da-36c5f8e943c8',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:50:57 GMT'
]);
