let nock = require('nock');

module.exports.hash = "81f6a4f181f2e0b07d83666ca1a64274";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/orssrc')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"orssrc\"><Blobs><Blob><Name>orsBlob</Name><VersionId>2020-06-22T10:32:08.3617832Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 22 Jun 2020 10:32:08 GMT</Creation-Time><Last-Modified>Mon, 22 Jun 2020 10:32:08 GMT</Last-Modified><Etag>0x8D8169784037828</Etag><Content-Length>308736</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>y7XBmARNLrDlPIkUsiWY+Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata><or-003ca702-58ab-4405-8f52-cb92316babde_9a53f315-d56b-44f6-a3e8-1d62c1b7089b>complete</or-003ca702-58ab-4405-8f52-cb92316babde_9a53f315-d56b-44f6-a3e8-1d62c1b7089b><or-d685bc41-c8ab-4ea5-889c-2503f02954d8_671e9447-be18-4632-9eea-a1a29cdae759>complete</or-d685bc41-c8ab-4ea5-889c-2503f02954d8_671e9447-be18-4632-9eea-a1a29cdae759></OrMetadata></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a7d7047-901e-001c-5955-5477c9000000',
  'x-ms-client-request-id',
  'ebe1323d-4706-4500-b47d-30c4109c968f',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Jul 2020 11:55:31 GMT'
]);

nock('https://fakestorageaccount1.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/orsdst')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount1.blob.core.windows.net/\" ContainerName=\"orsdst\"><Blobs><Blob><Name>orsBlob</Name><VersionId>2020-06-22T10:34:31.4703177Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 22 Jun 2020 10:34:31 GMT</Creation-Time><Last-Modified>Mon, 22 Jun 2020 10:34:31 GMT</Last-Modified><Etag>0x8D81697D94ED700</Etag><Content-Length>308736</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>kCV+1gAdCnU=</Content-CRC64><Content-MD5>y7XBmARNLrDlPIkUsiWY+Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9f7f44c-c01e-003e-1755-54b2d6000000',
  'x-ms-client-request-id',
  '0197fe6a-a9aa-4819-99f0-06a09db9fb69',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Jul 2020 11:55:32 GMT'
]);
