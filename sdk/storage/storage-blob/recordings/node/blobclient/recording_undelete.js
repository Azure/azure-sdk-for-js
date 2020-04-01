let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container158224819242602498","blob":"blob158224819384806465"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158224819242602498')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 21 Feb 2020 01:23:13 GMT',
  'ETag',
  '"0x8D7B66C9F05446C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16a15905-f01e-0048-4755-e84232000000',
  'x-ms-client-request-id',
  '0701b4e0-e23c-4571-b062-a811c675cc23',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 21 Feb 2020 01:23:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158224819242602498/blob158224819384806465', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 21 Feb 2020 01:23:14 GMT',
  'ETag',
  '"0x8D7B66C9FB99A69"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1569be6-a01e-0008-2155-e8450a000000',
  'x-ms-client-request-id',
  '1d217bd0-430b-4927-92e8-c9e983188d6e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 21 Feb 2020 01:23:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>true</Read><Write>true</Write><Delete>true</Delete><RetentionPolicy><Enabled>true</Enabled><Days>5</Days></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT,PATCH</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>86400</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors><DeleteRetentionPolicy><Enabled>true</Enabled><Days>7</Days></DeleteRetentionPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite></StorageServiceProperties>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1206a6c6-601e-0017-1555-e8f60e000000',
  'x-ms-client-request-id',
  'a54eeccd-225e-4712-8fc2-a0ecd57f1cca',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 21 Feb 2020 01:23:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158224819242602498/blob158224819384806465')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4317385a-801e-0052-2355-e823ed000000',
  'x-ms-client-request-id',
  '74edeedb-f29f-4143-bc94-24d1ce31e039',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 21 Feb 2020 01:23:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158224819242602498')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158224819242602498\"><MaxResults>1</MaxResults><Blobs><Blob><Name>blob158224819384806465</Name><Deleted>true</Deleted><Properties><Creation-Time>Fri, 21 Feb 2020 01:23:14 GMT</Creation-Time><Last-Modified>Fri, 21 Feb 2020 01:23:14 GMT</Last-Modified><Etag>0x8D7B66C9FB99A69</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus /><ServerEncrypted>true</ServerEncrypted><DeletedTime>Fri, 21 Feb 2020 01:23:17 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16a15f77-f01e-0048-0455-e84232000000',
  'x-ms-client-request-id',
  '9ee5fb28-702d-4320-9897-bb38ddd5bf82',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 21 Feb 2020 01:23:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158224819242602498/blob158224819384806465')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4317393f-801e-0052-7755-e823ed000000',
  'x-ms-client-request-id',
  '9b5fb2c2-879c-4747-88cb-05d2adbde60e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 21 Feb 2020 01:23:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158224819242602498')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container158224819242602498\"><Blobs><Blob><Name>blob158224819384806465</Name><Properties><Creation-Time>Fri, 21 Feb 2020 01:23:14 GMT</Creation-Time><Last-Modified>Fri, 21 Feb 2020 01:23:14 GMT</Last-Modified><Etag>0x8D7B66C9FB99A69</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16a16073-f01e-0048-6355-e84232000000',
  'x-ms-client-request-id',
  '7231eea9-7bf1-40a0-a359-811726cc6404',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 21 Feb 2020 01:23:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158224819242602498')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16a16113-f01e-0048-7355-e84232000000',
  'x-ms-client-request-id',
  '500e08dc-9fa1-487c-91d0-3ca0ac351314',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 21 Feb 2020 01:23:17 GMT'
]);
