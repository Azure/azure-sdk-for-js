let nock = require('nock');

module.exports.hash = "5674fb834dc24f85ec088c07998c3ed1";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485945236601463"},"newDate":{"minutesLater":"2021-06-28T05:50:52.368Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485945236601463')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:52 GMT',
  'ETag',
  '"0x8D939F8B09F295E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9466e-101e-001b-09e1-6b45f9000000',
  'x-ms-client-request-id',
  '989e2b96-b9b9-4e24-9aef-c9ddcaade74c',
  'x-ms-version',
  '2020-08-04',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:50:52.7529310Z',
  'Date',
  'Mon, 28 Jun 2021 05:50:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485945236601463')
  .reply(200, "", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8B09F295E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94673-101e-001b-0de1-6b45f9000000',
  'x-ms-client-request-id',
  '321c7d45-eacc-4512-85c3-633c9fe459c1',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:52.7529310Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:52 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:52 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485945236601463</Name><VersionId>2021-06-28T05:50:52.7529310Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:52 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:52 GMT</Last-Modified><Etag>0x8D939F8B09F295E</Etag><Content-Length>512</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5 /><Cache-Control /><Content-Disposition /><x-ms-blob-sequence-number>0</x-ms-blob-sequence-number><BlobType>PageBlob</BlobType><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94677-101e-001b-11e1-6b45f9000000',
  'x-ms-client-request-id',
  '3ed8c581-8b11-4e25-81a7-c9286c0bce55',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485945236601463')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada94679-101e-001b-13e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '19157fc8-4fb5-4af7-a124-0c9f178de5e4',
  'Date',
  'Mon, 28 Jun 2021 05:50:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485945236601463')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9467c-101e-001b-16e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '39ae5d3f-e655-4b10-9e3a-9b2841835109',
  'Date',
  'Mon, 28 Jun 2021 05:50:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485945236601463')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9467d-101e-001b-17e1-6b45f9000000',
  'x-ms-client-request-id',
  'd3759158-56bf-4803-9719-b72ba15ab602',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:50:53 GMT'
]);
