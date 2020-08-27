let nock = require('nock');

module.exports.hash = "0cfc9fb8a70b908f886cfd52f6c6ae90";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 16 Jan 2020 20:25:28 GMT',
  'ETag',
  '"0x8D79AC239D611F1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '067e140c-501e-004a-183a-7cdcd0000000',
  'x-ms-client-request-id',
  '65795f25-0502-4df6-bd66-49f095204843',
  'x-ms-version',
  '2019-12-12',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Date',
  'Thu, 27 Aug 2020 06:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed/meta%2Fsegments.json')
  .reply(200, {"version":0,"lastConsumable":"2020-06-01T21:00:00.000Z","storageDiagnostics":{"version":0,"lastModifiedTime":"2020-06-01T21:05:31.387Z","data":{"aid":"f7d1e86f-5006-0065-0058-38d11b063f9a","lfz":"2020-06-01T20:00:00.000Z"}}}, [
  'Content-Length',
  '225',
  'Content-Type',
  'application/json',
  'Content-MD5',
  'QuB0ASmt9Z12hGvv7ai+GA==',
  'Last-Modified',
  'Mon, 01 Jun 2020 21:05:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8066F84E9334A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '067e1454-501e-004a-593a-7cdcd0000000',
  'x-ms-client-request-id',
  '1fdc3a46-b83a-44fc-930b-34e79565f71a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Thu, 16 Jan 2020 21:36:42 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Thu, 27 Aug 2020 06:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"%24blobchangefeed\"><Prefix>idx/segments/</Prefix><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>idx/segments/1601/</Name></BlobPrefix><BlobPrefix><Name>idx/segments/2020/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '067e148f-501e-004a-0e3a-7cdcd0000000',
  'x-ms-client-request-id',
  'c81e9a62-0397-48f5-b984-4cacdb8e2980',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 27 Aug 2020 06:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"%24blobchangefeed\"><Prefix>idx/segments/2020/</Prefix><Blobs><Blob><Name>idx/segments/2020/01/16/2100/meta.json</Name><Properties><Creation-Time>Thu, 16 Jan 2020 21:37:42 GMT</Creation-Time><Last-Modified>Tue, 21 Jan 2020 18:51:58 GMT</Last-Modified><Etag>0x8D79EA2FE4F5346</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>vzwoCByrJnrkChmLbATrgw==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/01/21/1800/meta.json</Name><Properties><Creation-Time>Tue, 21 Jan 2020 18:51:58 GMT</Creation-Time><Last-Modified>Tue, 21 Jan 2020 21:28:20 GMT</Last-Modified><Etag>0x8D79EB8D65881EC</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>IOSS00p0DhQhW5WZaa/AYQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/01/21/2100/meta.json</Name><Properties><Creation-Time>Tue, 21 Jan 2020 21:28:20 GMT</Creation-Time><Last-Modified>Fri, 21 Feb 2020 22:23:04 GMT</Last-Modified><Etag>0x8D7B71C9ED5B2C2</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>rMJOssginCVk40/nHA7beQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/02/21/2200/meta.json</Name><Properties><Creation-Time>Fri, 21 Feb 2020 22:23:04 GMT</Creation-Time><Last-Modified>Fri, 08 May 2020 21:36:05 GMT</Last-Modified><Etag>0x8D7F397D06EBC38</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>0qDhvBmWzT4sHWm2R7f7Zw==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/08/2100/meta.json</Name><Properties><Creation-Time>Fri, 08 May 2020 21:36:05 GMT</Creation-Time><Last-Modified>Wed, 27 May 2020 15:45:40 GMT</Last-Modified><Etag>0x8D8025502320015</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>hXO6wTQbisWw12TQW8Ex3w==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/27/1500/meta.json</Name><Properties><Creation-Time>Wed, 27 May 2020 15:45:40 GMT</Creation-Time><Last-Modified>Wed, 27 May 2020 16:35:04 GMT</Last-Modified><Etag>0x8D8025BE8C00911</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>lI6LHgfm99Y2xljHKSAr9Q==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/27/1600/meta.json</Name><Properties><Creation-Time>Wed, 27 May 2020 16:35:04 GMT</Creation-Time><Last-Modified>Fri, 29 May 2020 17:00:40 GMT</Last-Modified><Etag>0x8D803F1D1241B78</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>PCA+dDvBmbY+DrRnPKS7yA==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/29/1600/meta.json</Name><Properties><Creation-Time>Fri, 29 May 2020 17:00:40 GMT</Creation-Time><Last-Modified>Fri, 29 May 2020 17:02:40 GMT</Last-Modified><Etag>0x8D803F218A3410E</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>zlU3hLOAc0HlRs1DjAaF9A==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/29/1700/meta.json</Name><Properties><Creation-Time>Fri, 29 May 2020 17:02:40 GMT</Creation-Time><Last-Modified>Fri, 29 May 2020 20:12:24 GMT</Last-Modified><Etag>0x8D8040C9A20A6A5</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>bEDtQZGNAO5B4Oz3jcdesQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/29/2000/meta.json</Name><Properties><Creation-Time>Fri, 29 May 2020 20:12:24 GMT</Creation-Time><Last-Modified>Fri, 29 May 2020 21:03:49 GMT</Last-Modified><Etag>0x8D80413C8F8D78D</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>ryL5hHzuEA5g3VfnJ4Clfw==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/05/29/2100/meta.json</Name><Properties><Creation-Time>Fri, 29 May 2020 21:03:49 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 15:51:15 GMT</Last-Modified><Etag>0x8D806439DFC6A64</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>STiHfikzUkcDJIj2jLGhnw==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/06/01/1500/meta.json</Name><Properties><Creation-Time>Mon, 01 Jun 2020 15:51:15 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 16:05:35 GMT</Last-Modified><Etag>0x8D806459EBB7340</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>/96SZ3C2z+KR2e7KE1L4UQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/06/01/1600/meta.json</Name><Properties><Creation-Time>Mon, 01 Jun 2020 16:05:35 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 17:25:00 GMT</Last-Modified><Etag>0x8D80650B6D6E7EB</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>KjbJLsl5iYrFczyE21pCng==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/06/01/1700/meta.json</Name><Properties><Creation-Time>Mon, 01 Jun 2020 17:25:00 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 19:13:01 GMT</Last-Modified><Etag>0x8D8065FCD9F25EC</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>jEbtt206IZPG5VM3FcC6uQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/06/01/1900/meta.json</Name><Properties><Creation-Time>Mon, 01 Jun 2020 19:13:01 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 20:54:36 GMT</Last-Modified><Etag>0x8D8066DFE87A4AE</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>samWT0EyebvEArLMVIUP3g==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/06/01/2000/meta.json</Name><Properties><Creation-Time>Mon, 01 Jun 2020 20:54:36 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 21:05:31 GMT</Last-Modified><Etag>0x8D8066F84DE5BED</Etag><Content-Length>432</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>MNV2yKTAnKlCkAVyRj9Ekw==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>idx/segments/2020/06/01/2100/meta.json</Name><Properties><Creation-Time>Mon, 01 Jun 2020 21:05:30 GMT</Creation-Time><Last-Modified>Mon, 01 Jun 2020 21:05:30 GMT</Last-Modified><Etag>0x8D8066F84AD09E5</Etag><Content-Length>433</Content-Length><Content-Type>application/json</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>aCPJOFOuAUw+bWIh+V19gA==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '067e14c6-501e-004a-3f3a-7cdcd0000000',
  'x-ms-client-request-id',
  '74a763c1-4e8f-4fff-8db6-6fc6928d6859',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 27 Aug 2020 06:19:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed/idx%2Fsegments%2F2020%2F01%2F16%2F2100%2Fmeta.json')
  .reply(200, {"version":0,"begin":"2020-01-16T21:00:00.000Z","intervalSecs":3600,"status":"Finalized","config":{"version":0,"configVersionEtag":"0x8d79acc514fd60a","numShards":1,"recordsFormat":"avro","formatSchemaVersion":1,"shardDistFnVersion":1},"chunkFilePaths":["$blobchangefeed/log/00/2020/01/16/2100/"],"storageDiagnostics":{"version":0,"lastModifiedTime":"2020-01-16T21:37:42.441Z","data":{"aid":"bc86d97e-1006-0029-00b5-cc412b061a0b"}}}, [
  'Content-Length',
  '432',
  'Content-Type',
  'application/json',
  'Content-MD5',
  'vzwoCByrJnrkChmLbATrgw==',
  'Last-Modified',
  'Tue, 21 Jan 2020 18:51:58 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D79EA2FE4F5346"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '067e1563-501e-004a-423a-7cdcd0000000',
  'x-ms-client-request-id',
  'aaab531e-a129-4793-8a39-41720c0d3d11',
  'x-ms-version',
  '2019-12-12',
  'x-ms-creation-time',
  'Thu, 16 Jan 2020 21:37:42 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Thu, 27 Aug 2020 06:19:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"%24blobchangefeed\"><Prefix>log/00/2020/01/16/2100/</Prefix><Blobs><Blob><Name>log/00/2020/01/16/2100/00000.avro</Name><Properties><Creation-Time>Thu, 16 Jan 2020 21:38:42 GMT</Creation-Time><Last-Modified>Thu, 16 Jan 2020 21:38:42 GMT</Last-Modified><Etag>0x8D79ACC750BF3D4</Etag><Content-Length>56318</Content-Length><Content-Type>avro/binary</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5 /><Cache-Control /><Content-Disposition /><BlobType>AppendBlob</BlobType><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '067e15b2-501e-004a-0c3a-7cdcd0000000',
  'x-ms-client-request-id',
  'fe0dc666-0a8e-4013-b78c-f50a7f4119fc',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 27 Aug 2020 06:19:58 GMT'
]);
