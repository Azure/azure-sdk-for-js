let nock = require('nock');

module.exports.hash = "22aa270c807fed270cf40da4204adab6";

module.exports.testInfo = {"uniqueName":{"container":"container159210827283501141","blob":"blob159210827283703139"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827283501141')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E82D157B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f41-201e-003e-0e02-42dadf000000',
  'x-ms-client-request-id',
  'b6dcca5d-e71f-4082-97ea-62600d64fc29',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827283501141/blob159210827283703139', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:52 GMT',
  'ETag',
  '"0x8D81019E82FCB3E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f46-201e-003e-1102-42dadf000000',
  'x-ms-client-request-id',
  '186f7e20-9a3f-4721-a629-cccc7c250950',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:52.8598334Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>false</Read><Write>false</Write><Delete>false</Delete><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></MinuteMetrics><Cors /><DeleteRetentionPolicy><Enabled>false</Enabled></DeleteRetentionPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite><DefaultServiceVersion>2018-03-28</DefaultServiceVersion></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f4a-201e-003e-1402-42dadf000000',
  'x-ms-client-request-id',
  '79817cbd-e026-4820-946a-dd875da1b907',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><StorageServiceProperties><DeleteRetentionPolicy><Enabled>true</Enabled><Days>7</Days></DeleteRetentionPolicy></StorageServiceProperties>")
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f4d-201e-003e-1702-42dadf000000',
  'x-ms-client-request-id',
  'dcbf3ff8-3d93-4a34-9af7-c72878c505ec',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>false</Read><Write>false</Write><Delete>false</Delete><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></MinuteMetrics><Cors /><DeleteRetentionPolicy><Enabled>true</Enabled><Days>7</Days></DeleteRetentionPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite><DefaultServiceVersion>2018-03-28</DefaultServiceVersion></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f56-201e-003e-1a02-42dadf000000',
  'x-ms-client-request-id',
  '94987602-4d4e-4943-b9e8-e2960fdef3e5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827283501141/blob159210827283703139')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f58-201e-003e-1c02-42dadf000000',
  'x-ms-client-request-id',
  '49b9603d-e038-4ea1-bada-58105c2da8e3',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827283501141')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159210827283501141\"><MaxResults>1</MaxResults><Blobs><Blob><Name>blob159210827283703139</Name><VersionId>2020-06-14T04:17:52.8598334Z</VersionId><Properties><Creation-Time>Sun, 14 Jun 2020 04:17:52 GMT</Creation-Time><Last-Modified>Sun, 14 Jun 2020 04:17:52 GMT</Last-Modified><Etag>0x8D81019E82FCB3E</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker>2!88!MDAwMDIyIWJsb2IxNTkyMTA4MjcyODM3MDMxMzkhMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVoh</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f5d-201e-003e-2002-42dadf000000',
  'x-ms-client-request-id',
  '60e46583-bd02-47fd-9961-6dc7ed633206',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827283501141/blob159210827283703139')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f5f-201e-003e-2202-42dadf000000',
  'x-ms-client-request-id',
  '92fe5607-2425-4feb-8a70-7304b807db24',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827283501141')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159210827283501141\"><Blobs><Blob><Name>blob159210827283703139</Name><VersionId>2020-06-14T04:17:52.8598334Z</VersionId><Properties><Creation-Time>Sun, 14 Jun 2020 04:17:52 GMT</Creation-Time><Last-Modified>Sun, 14 Jun 2020 04:17:52 GMT</Last-Modified><Etag>0x8D81019E82FCB3E</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f65-201e-003e-2802-42dadf000000',
  'x-ms-client-request-id',
  '2457fc1b-f748-47ed-9ce5-d7547667f23f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827283501141')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308f68-201e-003e-2b02-42dadf000000',
  'x-ms-client-request-id',
  '0150839c-6062-4178-98ca-ff2fa1bca745',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);
