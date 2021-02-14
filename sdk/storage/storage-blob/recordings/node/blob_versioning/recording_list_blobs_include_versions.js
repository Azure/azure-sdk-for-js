let nock = require('nock');

module.exports.hash = "d1f04813bc3b3c180b3c151592797721";

module.exports.testInfo = {"uniqueName":{"container":"container159218739798401048","blob":"blob159218739827103012","blockblob/0":"blockblob/0159218739885105753","blockblob/1":"blockblob/1159218739914105458"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739798401048')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:38 GMT',
  'ETag',
  '"0x8D810D2227D5AF2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031b57-501e-0069-2cbb-4274ec000000',
  'x-ms-client-request-id',
  'c73c5674-452e-4456-abb4-66680c7d4d31',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739798401048/blob159218739827103012', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:38 GMT',
  'ETag',
  '"0x8D810D222A9BCEB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031c45-501e-0069-01bb-4274ec000000',
  'x-ms-client-request-id',
  '81d7cd13-761d-4765-a333-368aaf9df399',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:38.3651051Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739798401048/blob159218739827103012')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:38 GMT',
  'ETag',
  '"0x8D810D222D5B6DE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031cef-501e-0069-21bb-4274ec000000',
  'x-ms-client-request-id',
  'e2acb811-e53e-4bd9-8da4-83297a145aec',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:38.6543086Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739798401048/blockblob%2F0159218739885105753')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:38 GMT',
  'ETag',
  '"0x8D810D22301FEFB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031d87-501e-0069-34bb-4274ec000000',
  'x-ms-client-request-id',
  'c7c727f2-b2d5-45a2-b36b-546271b1cc1c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:38.9445138Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218739798401048/blockblob%2F1159218739914105458')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:16:39 GMT',
  'ETag',
  '"0x8D810D2232E6E34"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031e9c-501e-0069-34bb-4274ec000000',
  'x-ms-client-request-id',
  '43c1fe8d-fa95-456d-9d61-7df78090cb32',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:16:39.2357186Z',
  'Date',
  'Mon, 15 Jun 2020 02:16:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159218739798401048')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159218739798401048\"><Blobs><Blob><Name>blob159218739827103012</Name><VersionId>2020-06-15T02:16:38.3651051Z</VersionId><Properties><Creation-Time>Mon, 15 Jun 2020 02:16:38 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:16:38 GMT</Last-Modified><Etag>0x8D810D222A9BCEB</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blob159218739827103012</Name><VersionId>2020-06-15T02:16:38.6543086Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 15 Jun 2020 02:16:38 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:16:38 GMT</Last-Modified><Etag>0x8D810D222D5B6DE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/0159218739885105753</Name><VersionId>2020-06-15T02:16:38.9445138Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 15 Jun 2020 02:16:38 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:16:38 GMT</Last-Modified><Etag>0x8D810D22301FEFB</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/1159218739914105458</Name><VersionId>2020-06-15T02:16:39.2357186Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Mon, 15 Jun 2020 02:16:39 GMT</Creation-Time><Last-Modified>Mon, 15 Jun 2020 02:16:39 GMT</Last-Modified><Etag>0x8D810D2232E6E34</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8031f6c-501e-0069-7dbb-4274ec000000',
  'x-ms-client-request-id',
  '83b3063d-0c0e-42ee-8557-46870a3bfe7b',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:16:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218739798401048')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd80320f8-501e-0069-7dbb-4274ec000000',
  'x-ms-client-request-id',
  'cd5154a5-eeb2-4f78-8f41-6faccf2069f4',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:16:39 GMT'
]);
