let nock = require('nock');

module.exports.hash = "6792f50664e5657867a58bb56c5c68c9";

module.exports.testInfo = {"uniqueName":{"container":"container158512476074705738","blob":"blob158512476253303108"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512476074705738')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:26:02 GMT',
  'ETag',
  '"0x8D7D0962760746D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7c1e-501e-0009-5d7f-02c0ed000000',
  'x-ms-client-request-id',
  'be8fd281-b1d3-4920-847b-4516b190e157',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 08:26:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512476074705738/blob158512476253303108', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:26:03 GMT',
  'ETag',
  '"0x8D7D096286E527B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7c80-501e-0009-307f-02c0ed000000',
  'x-ms-client-request-id',
  '06e1fd49-1491-4074-a7c9-6e4be98f6acf',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T08:26:03.8215043Z',
  'Date',
  'Wed, 25 Mar 2020 08:26:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512476074705738/blob158512476253303108')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:26:04 GMT',
  'ETag',
  '"0x8D7D0962897DB0D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7c9a-501e-0009-437f-02c0ed000000',
  'x-ms-client-request-id',
  '6d6d3c8e-fa42-4c7a-8f08-f69974a38566',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T08:26:04.0946994Z',
  'Date',
  'Wed, 25 Mar 2020 08:26:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158512476074705738/blob158512476253303108')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:26:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D096286E527B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7cac-501e-0009-517f-02c0ed000000',
  'x-ms-client-request-id',
  '0519cdf0-dafd-4295-b470-e969820536d3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:26:03.8215043Z',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 08:26:03 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 08:26:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158512476074705738/blob158512476253303108')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:26:04 GMT',
  'ETag',
  '"0x8D7D09628ECC160"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7cbb-501e-0009-5c7f-02c0ed000000',
  'x-ms-client-request-id',
  '3dd5a71a-42d6-4ffb-b156-1008f143b666',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:26:04.6510986Z',
  'x-ms-copy-id',
  '08dbc451-7517-44a9-8665-051330711f5e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 25 Mar 2020 08:26:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158512476074705738')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158512476074705738\"><Blobs><Blob><Name>blob158512476253303108</Name><VersionId>2020-03-25T08:26:03.8215043Z</VersionId><Properties><Creation-Time>Wed, 25 Mar 2020 08:26:03 GMT</Creation-Time><Last-Modified>Wed, 25 Mar 2020 08:26:03 GMT</Last-Modified><Etag>0x8D7D096286E527B</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158512476253303108</Name><VersionId>2020-03-25T08:26:04.0946994Z</VersionId><Properties><Creation-Time>Wed, 25 Mar 2020 08:26:04 GMT</Creation-Time><Last-Modified>Wed, 25 Mar 2020 08:26:04 GMT</Last-Modified><Etag>0x8D7D0962897DB0D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158512476253303108</Name><VersionId>2020-03-25T08:26:04.6510986Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Wed, 25 Mar 2020 08:26:04 GMT</Creation-Time><Last-Modified>Wed, 25 Mar 2020 08:26:04 GMT</Last-Modified><Etag>0x8D7D09628ECC160</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7cd4-501e-0009-727f-02c0ed000000',
  'x-ms-client-request-id',
  'c7d8bfe4-c607-4008-89a6-feb23ed3c16b',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 08:26:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158512476074705738/blob158512476253303108')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 08:26:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D09628ECC160"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7ce6-501e-0009-027f-02c0ed000000',
  'x-ms-client-request-id',
  'd0c78850-4260-4c7a-ab05-7864ff569c73',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T08:26:04.6510986Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 08:26:04 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '08dbc451-7517-44a9-8665-051330711f5e',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container158512476074705738/blob158512476253303108?versionid=2020-03-25T08:26:03.8215043Z',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Wed, 25 Mar 2020 08:26:04 GMT',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 08:26:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158512476074705738')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddad7d30-501e-0009-3b7f-02c0ed000000',
  'x-ms-client-request-id',
  '96872254-6a83-4c72-8062-f3a3b5e064aa',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 08:26:06 GMT'
]);
