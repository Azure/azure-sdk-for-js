let nock = require('nock');

module.exports.hash = "9bc8297ebe389da5e99b8179ad7ec994";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485943993704427"},"newDate":{"minutesBefore":"2021-06-28T05:50:40.230Z","minutesLater":"2021-06-28T05:50:40.230Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485943993704427', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:40 GMT',
  'ETag',
  '"0x8D939F8A93630EE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945a7-101e-001b-04e1-6b45f9000000',
  'x-ms-client-request-id',
  '7c0801f2-24e1-49cb-b4b9-fad6e30bb009',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:50:40.3209454Z',
  'Date',
  'Mon, 28 Jun 2021 05:50:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485943993704427')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:40 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-request-id',
  'ada945ac-101e-001b-06e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '27960b19-1ae5-4f78-b7e9-948276bc4cf2',
  'Date',
  'Mon, 28 Jun 2021 05:50:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485943993704427')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8A93630EE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945b0-101e-001b-0ae1-6b45f9000000',
  'x-ms-client-request-id',
  'f093c5d3-41c3-44ca-b679-a8e9c93ad602',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:40.3209454Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:40 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:40 GMT',
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
  'Mon, 28 Jun 2021 05:50:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Delimiter>/</Delimiter><Blobs><Blob><Name>blob162485943993704427</Name><VersionId>2021-06-28T05:50:40.3209454Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:40 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:40 GMT</Last-Modified><Etag>0x8D939F8A93630EE</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><ImmutabilityPolicyUntilDate>Mon, 28 Jun 2021 05:55:40 GMT</ImmutabilityPolicyUntilDate><ImmutabilityPolicyMode>unlocked</ImmutabilityPolicyMode></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945b2-101e-001b-0be1-6b45f9000000',
  'x-ms-client-request-id',
  '4e04bac6-4dc5-4392-a844-380e68f9e911',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername/blob162485943993704427')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8A93630EE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945b7-101e-001b-0ee1-6b45f9000000',
  'x-ms-client-request-id',
  'c72aa391-32db-4370-8749-b5ebdf51e9c8',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:40.3209454Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:40 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:40 GMT',
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
  'Mon, 28 Jun 2021 05:50:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485943993704427</Name><VersionId>2021-06-28T05:50:40.3209454Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:40 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:40 GMT</Last-Modified><Etag>0x8D939F8A93630EE</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945bf-101e-001b-13e1-6b45f9000000',
  'x-ms-client-request-id',
  '10e5dd6e-75c1-43f2-93dd-f366f470f78d',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485943993704427')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada945c2-101e-001b-15e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '3f9c00e3-7582-4f69-91fa-50ea1ec146c9',
  'Date',
  'Mon, 28 Jun 2021 05:50:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485943993704427')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945c7-101e-001b-18e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'e6cd9023-5d45-49b4-9fce-27a3b8efcd4b',
  'Date',
  'Mon, 28 Jun 2021 05:50:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485943993704427')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada945cd-101e-001b-1ee1-6b45f9000000',
  'x-ms-client-request-id',
  '9d6fdf36-c4d6-43b9-9b10-15006504eb41',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:50:42 GMT'
]);
