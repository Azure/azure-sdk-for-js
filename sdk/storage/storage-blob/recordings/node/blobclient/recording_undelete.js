let nock = require('nock');

module.exports.hash = "664e597a232fdfcf31e7da90f8f95d42";

module.exports.testInfo = {"uniqueName":{"container":"container159246828428808862","blob":"blob159246828562302160"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159246828428808862')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 18 Jun 2020 08:18:05 GMT',
  'ETag',
  '"0x8D81360209C33C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d2519-f01e-00ab-5948-4589eb000000',
  'x-ms-client-request-id',
  '6905d233-a1aa-4884-ab60-661b611198bc',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 18 Jun 2020 08:18:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159246828428808862/blob159246828562302160', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 18 Jun 2020 08:18:06 GMT',
  'ETag',
  '"0x8D8136020CC4170"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d2584-f01e-00ab-2f48-4589eb000000',
  'x-ms-client-request-id',
  'bf11b7cc-b3fb-4a82-906d-9c9ebf1fede0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 18 Jun 2020 08:18:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>false</Read><Write>false</Write><Delete>false</Delete><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>7</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>false</Enabled><RetentionPolicy><Enabled>false</Enabled></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT,PATCH</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>86400</MaxAgeInSeconds></CorsRule></Cors><DeleteRetentionPolicy><Enabled>true</Enabled><Days>7</Days></DeleteRetentionPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d25ee-f01e-00ab-0648-4589eb000000',
  'x-ms-client-request-id',
  '29a6cb70-3100-4c82-8f38-1f90da4f92cf',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 18 Jun 2020 08:18:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159246828428808862/blob159246828562302160')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d262d-f01e-00ab-3548-4589eb000000',
  'x-ms-client-request-id',
  '75712233-217f-4777-b984-6dd6025b10f7',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 18 Jun 2020 08:18:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159246828428808862')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159246828428808862\"><MaxResults>1</MaxResults><Blobs><Blob><Name>blob159246828562302160</Name><Deleted>true</Deleted><Properties><Creation-Time>Thu, 18 Jun 2020 08:18:06 GMT</Creation-Time><Last-Modified>Thu, 18 Jun 2020 08:18:06 GMT</Last-Modified><Etag>0x8D8136020CC4170</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus /><ServerEncrypted>true</ServerEncrypted><DeletedTime>Thu, 18 Jun 2020 08:18:06 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d265f-f01e-00ab-5e48-4589eb000000',
  'x-ms-client-request-id',
  '37e42074-113c-468e-b675-f248abd71dc8',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 18 Jun 2020 08:18:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159246828428808862/blob159246828562302160')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d26b9-f01e-00ab-2a48-4589eb000000',
  'x-ms-client-request-id',
  '6dd1b52c-22f1-46a3-943a-2d5929f9da6a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 18 Jun 2020 08:18:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159246828428808862')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container159246828428808862\"><Blobs><Blob><Name>blob159246828562302160</Name><Properties><Creation-Time>Thu, 18 Jun 2020 08:18:06 GMT</Creation-Time><Last-Modified>Thu, 18 Jun 2020 08:18:06 GMT</Last-Modified><Etag>0x8D8136020CC4170</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d2701-f01e-00ab-6448-4589eb000000',
  'x-ms-client-request-id',
  '70934e08-7a7b-47e2-b764-cebc0471f128',
  'x-ms-version',
  '2019-12-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 18 Jun 2020 08:18:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159246828428808862')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '960d274d-f01e-00ab-1e48-4589eb000000',
  'x-ms-client-request-id',
  '7475a9ec-e852-4466-af66-53e17b958b50',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 18 Jun 2020 08:18:07 GMT'
]);
