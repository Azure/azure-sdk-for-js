let nock = require('nock');

module.exports.hash = "e35ff4f065823a8c3a3f2ee3cc20d6b9";

module.exports.testInfo = {"uniqueName":{"blob":"blob162565012448700681"},"newDate":{"aDayLater":"2021-07-07T09:28:45.649Z","minutesLater":"2021-07-07T09:28:45.653Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565012448700681', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 07 Jul 2021 09:28:45 GMT',
  'ETag',
  '"0x8D941299E6F87EF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef971058-101e-0025-5f12-73c553000000',
  'x-ms-client-request-id',
  '5e58d91b-e095-473a-977f-fcb73a6f4334',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-07-07T09:28:45.7209839Z',
  'Date',
  'Wed, 07 Jul 2021 09:28:45 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565012448700681')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-immutability-policy-until-date',
  'Wed, 07 Jul 2021 09:33:45 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-request-id',
  'ba8a0b55-c01e-0030-0b12-73b723000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'f1c9ba24-7226-4840-9e31-70aa4382493b',
  'Date',
  'Wed, 07 Jul 2021 09:28:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565012448700681')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'true',
  'x-ms-request-id',
  '8bc19d56-e01e-0002-5f12-73449d000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'bcc85d0d-d6d5-4462-a9b3-a8bc93607840',
  'Date',
  'Wed, 07 Jul 2021 09:28:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162565012448700681')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 07 Jul 2021 09:28:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D941299E6F87EF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2baea444-301e-0017-6712-7336ed000000',
  'x-ms-client-request-id',
  '7018bc59-a046-4617-a3cc-2c8802df0c11',
  'x-ms-version',
  '2020-10-02',
  'x-ms-version-id',
  '2021-07-07T09:28:45.7209839Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Wed, 07 Jul 2021 09:33:45 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-legal-hold',
  'true',
  'x-ms-creation-time',
  'Wed, 07 Jul 2021 09:28:45 GMT',
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
  'Wed, 07 Jul 2021 09:28:48 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162565012448700681</Name><VersionId>2021-07-07T09:28:45.7209839Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Wed, 07 Jul 2021 09:28:45 GMT</Creation-Time><Last-Modified>Wed, 07 Jul 2021 09:28:45 GMT</Last-Modified><Etag>0x8D941299E6F87EF</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Wed, 07 Jul 2021 09:33:45 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a75ff7f-901e-002b-5912-7389a8000000',
  'x-ms-client-request-id',
  'c53e30d0-9756-4e97-8cd1-a23a3a967ded',
  'x-ms-version',
  '2020-10-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 07 Jul 2021 09:28:49 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565012448700681')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  '2baea53e-301e-0017-5712-7336ed000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '2a2128c7-34af-4d5a-ae2d-03e8deeed6ef',
  'Date',
  'Wed, 07 Jul 2021 09:28:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162565012448700681')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1129f006-c01e-002f-5712-73f776000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '379f3d4a-7b14-4e61-bcb6-6c8181ed948f',
  'Date',
  'Wed, 07 Jul 2021 09:28:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162565012448700681')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b982e2-b01e-0019-7b12-737a16000000',
  'x-ms-client-request-id',
  '66b19fd5-747c-4802-8ac8-07870fc5282b',
  'x-ms-version',
  '2020-10-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 07 Jul 2021 09:28:53 GMT',
  'Connection',
  'close'
]);
