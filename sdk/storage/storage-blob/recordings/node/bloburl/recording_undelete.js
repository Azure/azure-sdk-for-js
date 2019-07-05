let nock = require('nock');

module.exports.testInfo = {"container":"container156231858492700525","blob":"blob156231858519805678"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858492700525')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:45 GMT',
  'ETag',
  '"0x8D70129EBD5B2A5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '714fe923-e01e-004b-5a12-330f0c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858492700525/blob156231858519805678', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:19:46 GMT',
  'ETag',
  '"0x8D70129EBFF40FA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02665767-c01e-0090-5612-33abda000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:19:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><StorageServiceProperties><Logging><Version>1.0</Version><Read>true</Read><Write>true</Write><Delete>true</Delete><RetentionPolicy><Enabled>true</Enabled><Days>5</Days></RetentionPolicy></Logging><HourMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>3</Days></RetentionPolicy></HourMetrics><MinuteMetrics><Version>1.0</Version><Enabled>true</Enabled><IncludeAPIs>true</IncludeAPIs><RetentionPolicy><Enabled>true</Enabled><Days>4</Days></RetentionPolicy></MinuteMetrics><Cors><CorsRule><AllowedMethods>GET,PUT,DELETE,HEAD,POST,OPTIONS</AllowedMethods><AllowedOrigins>*</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>888888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule><CorsRule><AllowedMethods>GET</AllowedMethods><AllowedOrigins>example.com</AllowedOrigins><AllowedHeaders>*</AllowedHeaders><ExposedHeaders>*</ExposedHeaders><MaxAgeInSeconds>8888</MaxAgeInSeconds></CorsRule></Cors><DeleteRetentionPolicy><Enabled>true</Enabled><Days>1</Days></DeleteRetentionPolicy><StaticWebsite><Enabled>false</Enabled></StaticWebsite><DefaultServiceVersion>2018-03-28</DefaultServiceVersion></StorageServiceProperties>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55c55079-401e-00a8-1612-33ea83000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231858492700525/blob156231858519805678')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3339d518-c01e-00f6-2612-331980000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 05 Jul 2019 09:19:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231858492700525')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231858492700525\"><Blobs><Blob><Name>blob156231858519805678</Name><Deleted>true</Deleted><Properties><Creation-Time>Fri, 05 Jul 2019 09:19:46 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:19:46 GMT</Last-Modified><Etag>0x8D70129EBFF40FA</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus /><ServerEncrypted>true</ServerEncrypted><DeletedTime>Fri, 05 Jul 2019 09:19:46 GMT</DeletedTime><RemainingRetentionDays>0</RemainingRetentionDays><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd989b3bd-401e-00e7-5212-332e9b000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231858492700525/blob156231858519805678')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0eb28ec5-501e-009e-1d12-3347d1000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231858492700525')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156231858492700525\"><Blobs><Blob><Name>blob156231858519805678</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:19:46 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:19:46 GMT</Last-Modified><Etag>0x8D70129EBFF40FA</Etag><Content-Length>11</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>sQqNsWTgdUEFt6mb5y4/5Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8aace16d-801e-0079-5812-3357dc000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:19:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231858492700525')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb8bf84a-401e-00a3-1c12-33f2f7000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:19:47 GMT',
  'Connection',
  'close' ]);

