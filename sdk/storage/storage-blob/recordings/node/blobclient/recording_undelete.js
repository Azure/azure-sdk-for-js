let nock = require('nock');

module.exports.hash = "4b2d62f655814eebf5c7065e3e0abe19";

module.exports.testInfo = {"uniqueName":{"container":"container158501877471701789","blob":"blob158501877599206974"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501877471701789')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 24 Mar 2020 02:59:35 GMT',
  'ETag',
  '"0x8D7CF9F62B3E84F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb905-b01e-0020-0588-01a5c1000000',
  'x-ms-client-request-id',
  'b214e4df-c810-4499-9125-9747306b8258',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 24 Mar 2020 02:59:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501877471701789/blob158501877599206974', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Mar 2020 02:59:36 GMT',
  'ETag',
  '"0x8D7CF9F62D9DF53"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb921-b01e-0020-1188-01a5c1000000',
  'x-ms-client-request-id',
  '6bf10953-d471-4765-8698-2f8a72220d82',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Mar 2020 02:59:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>false</Read><Write>false</Write><Delete>false</Delete><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>7</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>PATCH,PUT,OPTIONS,POST,MERGE,HEAD,GET,DELETE</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>86400</MaxAgeInSeconds></CorsRule></Cors><DeleteRetentionPolicy><Enabled>true</Enabled><Days>7</Days></DeleteRetentionPolicy><AutomaticSnapshotPolicy><Enabled>false</Enabled></AutomaticSnapshotPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb92e-b01e-0020-1888-01a5c1000000',
  'x-ms-client-request-id',
  '5d24c616-5071-4003-917c-3077e1e7dbb5',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 02:59:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158501877471701789/blob158501877599206974')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb945-b01e-0020-2688-01a5c1000000',
  'x-ms-client-request-id',
  '8cb27e45-844c-475b-b607-97d315268c50',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 24 Mar 2020 02:59:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158501877471701789')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158501877471701789\"><MaxResults>1</MaxResults><Blobs><Blob><Name>blob158501877599206974</Name><Deleted>true</Deleted><Properties><Creation-Time>Tue, 24 Mar 2020 02:59:36 GMT</Creation-Time><Last-Modified>Tue, 24 Mar 2020 02:59:36 GMT</Last-Modified><Etag>0x8D7CF9F62D9DF53</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus /><ServerEncrypted>true</ServerEncrypted><DeletedTime>Tue, 24 Mar 2020 02:59:36 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb95e-b01e-0020-3288-01a5c1000000',
  'x-ms-client-request-id',
  '30d3af48-4b56-47c8-9d5a-2c3229b30017',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 02:59:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158501877471701789/blob158501877599206974')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb976-b01e-0020-3f88-01a5c1000000',
  'x-ms-client-request-id',
  'bd930e1b-6345-4c14-adff-152086897948',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 24 Mar 2020 02:59:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158501877471701789')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158501877471701789\"><Blobs><Blob><Name>blob158501877599206974</Name><Properties><Creation-Time>Tue, 24 Mar 2020 02:59:36 GMT</Creation-Time><Last-Modified>Tue, 24 Mar 2020 02:59:36 GMT</Last-Modified><Etag>0x8D7CF9F62D9DF53</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb98e-b01e-0020-4f88-01a5c1000000',
  'x-ms-client-request-id',
  '56a91a00-9001-4d3d-9b8a-b27d4b76899f',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 02:59:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158501877471701789')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700eb99d-b01e-0020-5988-01a5c1000000',
  'x-ms-client-request-id',
  'b42f7831-4621-4161-aea7-63c7f45e0669',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 24 Mar 2020 02:59:37 GMT'
]);
