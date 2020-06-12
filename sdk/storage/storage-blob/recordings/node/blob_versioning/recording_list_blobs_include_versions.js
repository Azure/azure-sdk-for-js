let nock = require('nock');

module.exports.hash = "7343055b916de5458c6b21755c23322a";

module.exports.testInfo = {"uniqueName":{"container":"container158459899364508652","blob":"blob158459899502904787","blockblob/0":"blockblob/0158459899553202352","blockblob/1":"blockblob/1158459899578203015"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899364508652')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:14 GMT',
  'ETag',
  '"0x8D7CBCE01BB2B15"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3887-b01e-0088-1ab6-fd3fcb000000',
  'x-ms-client-request-id',
  'd1646155-1755-4762-b3b0-34cf56e413c5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899364508652/blob158459899502904787', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:15 GMT',
  'ETag',
  '"0x8D7CBCE01E2FD54"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e38e8-b01e-0088-69b6-fd3fcb000000',
  'x-ms-client-request-id',
  'bad7c8e8-a31b-4aeb-b14f-43fbaa1d612f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:15.1569236Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899364508652/blob158459899502904787')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:15 GMT',
  'ETag',
  '"0x8D7CBCE0208DBBB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3934-b01e-0088-2bb6-fd3fcb000000',
  'x-ms-client-request-id',
  'ae4e39e0-5cfe-419a-9fc9-1e2c382fd708',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:15.4071008Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899364508652/blockblob%2F0158459899553202352')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:15 GMT',
  'ETag',
  '"0x8D7CBCE022F7D94"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e397c-b01e-0088-6ab6-fd3fcb000000',
  'x-ms-client-request-id',
  'b6ce1ec0-95b4-41fe-9ca7-1056ea961fc9',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:15.6582804Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899364508652/blockblob%2F1158459899578203015')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:15 GMT',
  'ETag',
  '"0x8D7CBCE02566D9F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e39b7-b01e-0088-1eb6-fd3fcb000000',
  'x-ms-client-request-id',
  '63adf972-aa1b-4e83-b143-0add9508ac57',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:15.9144628Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158459899364508652')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158459899364508652\"><Blobs><Blob><Name>blob158459899502904787</Name><VersionId>2020-03-19T06:23:15.1569236Z</VersionId><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:15 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:15 GMT</Last-Modified><Etag>0x8D7CBCE01E2FD54</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blob158459899502904787</Name><VersionId>2020-03-19T06:23:15.4071008Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:15 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:15 GMT</Last-Modified><Etag>0x8D7CBCE0208DBBB</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blockblob/0158459899553202352</Name><VersionId>2020-03-19T06:23:15.6582804Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:15 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:15 GMT</Last-Modified><Etag>0x8D7CBCE022F7D94</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blockblob/1158459899578203015</Name><VersionId>2020-03-19T06:23:15.9144628Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Thu, 19 Mar 2020 06:23:15 GMT</Creation-Time><Last-Modified>Thu, 19 Mar 2020 06:23:15 GMT</Last-Modified><Etag>0x8D7CBCE02566D9F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3a22-b01e-0088-77b6-fd3fcb000000',
  'x-ms-client-request-id',
  '9678c27f-7c17-4ac4-8c42-c113eac1de8e',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 19 Mar 2020 06:23:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459899364508652')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3ad2-b01e-0088-08b6-fd3fcb000000',
  'x-ms-client-request-id',
  '8b9c1686-d29a-46e0-9805-b415a7a2b3f8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:16 GMT'
]);
