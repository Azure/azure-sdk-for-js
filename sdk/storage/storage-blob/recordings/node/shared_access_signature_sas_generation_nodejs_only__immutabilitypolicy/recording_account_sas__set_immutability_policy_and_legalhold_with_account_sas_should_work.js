let nock = require('nock');

module.exports.hash = "0664c39e70c807ef19b4514c7fff0e30";

module.exports.testInfo = {"uniqueName":{"blob":"blob162565010530504323"},"newDate":{"aDayLater":"2021-07-07T09:28:26.755Z","minutesLater":"2021-07-07T09:28:26.760Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565010530504323', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 07 Jul 2021 09:28:26 GMT',
  'ETag',
  '"0x8D941299328B06F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '666574d1-301e-0008-3e12-7376b8000000',
  'x-ms-client-request-id',
  'e54adb4c-352a-4861-8a1e-9193eecd3dc8',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-07-07T09:28:26.8017775Z',
  'Date',
  'Wed, 07 Jul 2021 09:28:26 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565010530504323')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-immutability-policy-until-date',
  'Wed, 07 Jul 2021 09:33:26 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-request-id',
  '6b85c247-201e-0014-3a12-73ee4e000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '1969f7c5-ed51-429c-8c06-326d60455522',
  'Date',
  'Wed, 07 Jul 2021 09:28:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565010530504323')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'true',
  'x-ms-request-id',
  '6fe266d3-901e-0015-7f12-730902000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'a0e29b13-5e82-409f-ac6f-52a94a002b54',
  'Date',
  'Wed, 07 Jul 2021 09:28:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162565010530504323')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 07 Jul 2021 09:28:26 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D941299328B06F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '060a7dd5-a01e-0005-1612-73e2e0000000',
  'x-ms-client-request-id',
  '75ba9bde-cb15-41ba-8d23-fc311eeed598',
  'x-ms-version',
  '2020-10-02',
  'x-ms-version-id',
  '2021-07-07T09:28:26.8017775Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Wed, 07 Jul 2021 09:33:26 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-legal-hold',
  'true',
  'x-ms-creation-time',
  'Wed, 07 Jul 2021 09:28:26 GMT',
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
  'Wed, 07 Jul 2021 09:28:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162565010530504323</Name><VersionId>2021-07-07T09:28:26.8017775Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Wed, 07 Jul 2021 09:28:26 GMT</Creation-Time><Last-Modified>Wed, 07 Jul 2021 09:28:26 GMT</Last-Modified><Etag>0x8D941299328B06F</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Wed, 07 Jul 2021 09:33:26 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1df1a3a7-401e-0000-2e12-737b72000000',
  'x-ms-client-request-id',
  'e6d56c77-e599-4917-b818-2ce891036405',
  'x-ms-version',
  '2020-10-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 07 Jul 2021 09:28:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565010530504323')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  '2c93fa01-001e-0026-1612-731df0000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '2b5f8233-f42a-41ba-bdaa-a023992128a0',
  'Date',
  'Wed, 07 Jul 2021 09:28:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162565010530504323')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3b97dac-b01e-0019-7412-737a16000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'bf523ddd-c2a5-46af-8da7-48354af43302',
  'Date',
  'Wed, 07 Jul 2021 09:28:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162565010530504323')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef970f6b-101e-0025-0712-73c553000000',
  'x-ms-client-request-id',
  'f716c616-0cb7-4627-8fdd-7fd4872bdd9b',
  'x-ms-version',
  '2020-10-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 07 Jul 2021 09:28:35 GMT',
  'Connection',
  'close'
]);
