let nock = require('nock');

module.exports.testInfo = {"عربي/عربى":"عربي/عربى155873894065800928"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash155873892532809477/%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89155873894065800928', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:20 GMT',
  'ETag',
  '"0x8D6E09BE0487E86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b91548d1-401e-0032-7d84-12c588000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 May 2019 23:02:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash155873892532809477/%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89155873894065800928')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 24 May 2019 23:02:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D6E09BE0487E86"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a8bc690-701e-007e-3b84-120297000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-creation-time',
  'Fri, 24 May 2019 23:02:20 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:20 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash155873892532809477')
  .query({"prefix":"%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89155873894065800928","restype":"container","comp":"list"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.blob.core.windows.net/\" ContainerName=\"1container-with-dash155873892532809477\"><Prefix>عربي/عربى155873894065800928</Prefix><Blobs><Blob><Name>عربي/عربى155873894065800928</Name><Properties><Creation-Time>Fri, 24 May 2019 23:02:20 GMT</Creation-Time><Last-Modified>Fri, 24 May 2019 23:02:20 GMT</Last-Modified><Etag>0x8D6E09BE0487E86</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f33df01b-c01e-0067-7784-122eff000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:21 GMT',
  'Connection',
  'close' ]);

