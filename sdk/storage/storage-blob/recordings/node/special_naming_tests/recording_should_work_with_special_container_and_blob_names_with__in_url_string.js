let nock = require('nock');

module.exports.testInfo = {"////blob/empty /another":"////blob/empty /another156231868390108471"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156231868169701661/////blob/empty%20/another156231868390108471', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:24 GMT',
  'ETag',
  '"0x8D7012A26D47CD5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbc15aaa-701e-0067-7e13-338d31000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash156231868169701661/////blob/empty%20/another156231868390108471')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A26D47CD5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84b15387-d01e-012a-0c13-330d86000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:21:24 GMT',
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
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash156231868169701661')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash156231868169701661\"><Prefix>////blob/empty /another156231868390108471</Prefix><Blobs><Blob><Name>////blob/empty /another156231868390108471</Name><Properties><Creation-Time>Fri, 05 Jul 2019 09:21:24 GMT</Creation-Time><Last-Modified>Fri, 05 Jul 2019 09:21:24 GMT</Last-Modified><Etag>0x8D7012A26D47CD5</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3e94aa7-601e-00d9-3f13-3398ba000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:25 GMT',
  'Connection',
  'close' ]);

