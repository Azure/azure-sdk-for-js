let nock = require('nock');

module.exports.hash = "d58d6a9f22284a137294c2c3ba06398b";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485944884309588"},"newDate":{"minutesLater":"2021-06-28T05:50:48.845Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944884309588')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:49 GMT',
  'ETag',
  '"0x8D939F8AE85E5CC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94640-101e-001b-62e1-6b45f9000000',
  'x-ms-client-request-id',
  '7f87c57f-aadc-4b64-9211-3305c2e7600a',
  'x-ms-version',
  '2020-08-04',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:50:49.2319180Z',
  'Date',
  'Mon, 28 Jun 2021 05:50:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/fakecontainername/blob162485944884309588')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:49 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D939F8AE85E5CC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94645-101e-001b-66e1-6b45f9000000',
  'x-ms-client-request-id',
  'a4c30bf1-8c9d-4e2b-a51b-ec7b77043c71',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-06-28T05:50:49.2319180Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-immutability-policy-until-date',
  'Mon, 28 Jun 2021 05:55:48 GMT',
  'x-ms-immutability-policy-mode',
  'unlocked',
  'x-ms-creation-time',
  'Mon, 28 Jun 2021 05:50:49 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-immutability-policy-until-date,x-ms-immutability-policy-mode,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485944884309588</Name><VersionId>2021-06-28T05:50:49.2319180Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:49 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:49 GMT</Last-Modified><Etag>0x8D939F8AE85E5CC</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>AppendBlob</BlobType><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94648-101e-001b-68e1-6b45f9000000',
  'x-ms-client-request-id',
  '9a127706-2a6b-486d-9d3b-b2617d219545',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944884309588')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada9464b-101e-001b-6be1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '2ac061ec-632d-49b8-89b6-13aba65c1746',
  'Date',
  'Mon, 28 Jun 2021 05:50:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485944884309588')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94651-101e-001b-6fe1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'bdd44c9f-3985-4a5d-a1e0-4d96ad3685e3',
  'Date',
  'Mon, 28 Jun 2021 05:50:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485944884309588')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94657-101e-001b-73e1-6b45f9000000',
  'x-ms-client-request-id',
  'bc025671-9b37-4a60-a6ad-418b70d0ba2b',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:50:50 GMT'
]);
