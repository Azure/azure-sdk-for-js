let nock = require('nock');

module.exports.hash = "fe11dc856cf4851b02978bc255d4039c";

module.exports.testInfo = {"uniqueName":{"blob":"blob162565011506700573"},"newDate":{"aDayLater":"2021-07-07T09:28:36.240Z","minutesLater":"2021-07-07T09:28:36.243Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565011506700573', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 07 Jul 2021 09:28:36 GMT',
  'ETag',
  '"0x8D9412998D36E21"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aadd1b3b-701e-002e-8012-73103a000000',
  'x-ms-client-request-id',
  '1f3da3fb-9bbb-4822-9ee8-b4eae81aa7da',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-07-07T09:28:36.3093537Z',
  'Date',
  'Wed, 07 Jul 2021 09:28:35 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565011506700573')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-immutability-policy-until-date',
  'Wed, 07 Jul 2021 09:33:36 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-request-id',
  '07cf231a-d01e-0012-1812-73af7f000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '76644be8-788b-4b68-9433-e12c052f340f',
  'Date',
  'Wed, 07 Jul 2021 09:28:36 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565011506700573')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'true',
  'x-ms-request-id',
  'd40f8f8f-601e-000c-0312-730866000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '8effaa96-e9cf-4791-8b68-b04150f4f0e2',
  'Date',
  'Wed, 07 Jul 2021 09:28:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162565011506700573')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 07 Jul 2021 09:28:36 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9412998D36E21"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be31c91a-001e-0007-7412-73dd0f000000',
  'x-ms-client-request-id',
  'a5843fdb-e7e1-4412-a31a-b58f7f44891e',
  'x-ms-version',
  '2020-10-02',
  'x-ms-version-id',
  '2021-07-07T09:28:36.3093537Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Wed, 07 Jul 2021 09:33:36 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-legal-hold',
  'true',
  'x-ms-creation-time',
  'Wed, 07 Jul 2021 09:28:36 GMT',
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
  'Wed, 07 Jul 2021 09:28:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162565011506700573</Name><VersionId>2021-07-07T09:28:36.3093537Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Wed, 07 Jul 2021 09:28:36 GMT</Creation-Time><Last-Modified>Wed, 07 Jul 2021 09:28:36 GMT</Last-Modified><Etag>0x8D9412998D36E21</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Wed, 07 Jul 2021 09:33:36 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '513e8454-801e-0028-1912-73510b000000',
  'x-ms-client-request-id',
  '838b46cd-24c9-41ee-b0ca-e35effeec058',
  'x-ms-version',
  '2020-10-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 07 Jul 2021 09:28:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162565011506700573')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  '751a82e3-f01e-0020-5c12-735cc1000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'e0c99a16-1990-45e4-9f75-81924613e39f',
  'Date',
  'Wed, 07 Jul 2021 09:28:41 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162565011506700573')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8737a2a8-c01e-0011-7912-7377dc000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'e06851cb-170e-43e7-acf1-7c439c58b077',
  'Date',
  'Wed, 07 Jul 2021 09:28:43 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162565011506700573')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09afded0-e01e-001d-6512-7304c8000000',
  'x-ms-client-request-id',
  'bc40fe36-d2d5-421e-b4e3-8b301ebf5f05',
  'x-ms-version',
  '2020-10-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 07 Jul 2021 09:28:43 GMT',
  'Connection',
  'close'
]);
