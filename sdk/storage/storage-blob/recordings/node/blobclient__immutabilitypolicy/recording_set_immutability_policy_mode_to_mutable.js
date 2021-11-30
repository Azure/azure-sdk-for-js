let nock = require('nock');

module.exports.hash = "ea718c9bd01f68c85eebc757873cbe87";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485944586601540"},"newDate":{"minutesLater":"2021-06-28T05:50:46.164Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944586601540', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 28 Jun 2021 05:50:46 GMT',
  'ETag',
  '"0x8D939F8ACBF9837"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9460f-101e-001b-45e1-6b45f9000000',
  'x-ms-client-request-id',
  'c4bc4806-4474-4a32-b015-29b5fd2a5593',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-06-28T05:50:46.2545975Z',
  'Date',
  'Mon, 28 Jun 2021 05:50:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944586601540')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:ada94614-101e-001b-47e1-6b45f9000000\nTime:2021-06-28T05:50:46.5481298Z</Message><HeaderName>x-ms-immutability-policy-mode</HeaderName><HeaderValue>Mutable</HeaderValue></Error>", [
  'Content-Length',
  '343',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'x-ms-request-id',
  'ada94614-101e-001b-47e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'b66b5ed9-64b5-4351-a006-44ac42fde16b',
  'Date',
  'Mon, 28 Jun 2021 05:50:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs><Blob><Name>blob162485944586601540</Name><VersionId>2021-06-28T05:50:46.2545975Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 28 Jun 2021 05:50:46 GMT</Creation-Time><Last-Modified>Mon, 28 Jun 2021 05:50:46 GMT</Last-Modified><Etag>0x8D939F8ACBF9837</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94618-101e-001b-4ae1-6b45f9000000',
  'x-ms-client-request-id',
  'c4cf8627-3e8b-46f8-8e3b-299e0ed16fc9',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944586601540')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-legal-hold',
  'false',
  'x-ms-request-id',
  'ada9461f-101e-001b-4ee1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  'ba337161-b1c8-4804-a0d0-54a2c6d7d896',
  'Date',
  'Mon, 28 Jun 2021 05:50:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485944586601540')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94626-101e-001b-52e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '05237e57-fe6b-44c8-b7c1-df1e8ab1f570',
  'Date',
  'Mon, 28 Jun 2021 05:50:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485944586601540')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada94627-101e-001b-53e1-6b45f9000000',
  'x-ms-client-request-id',
  'b536ab5f-b077-45dc-af32-8542f7e2d7eb',
  'x-ms-version',
  '2020-08-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 28 Jun 2021 05:50:47 GMT'
]);
