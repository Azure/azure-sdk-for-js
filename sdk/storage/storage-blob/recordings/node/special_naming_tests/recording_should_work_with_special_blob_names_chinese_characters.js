let nock = require('nock');

module.exports.testInfo = {"////Upper/blob/empty /another 汉字":"////Upper/blob/empty /another 汉字156816857609508935"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash156816856896007000/%2F%2F%2F%2FUpper%2Fblob%2Fempty%20%2Fanother%20%E6%B1%89%E5%AD%97156816857609508935', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:56 GMT',
  'ETag',
  '"0x8D7365EF52CDF6D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a465e85a-001e-001b-0d47-68486e000000',
  'x-ms-client-request-id',
  'e9f37f83-4f96-4d14-9dfe-75f874e4ec8a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:22:56 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash156816856896007000/%2F%2F%2F%2FUpper%2Fblob%2Fempty%20%2Fanother%20%E6%B1%89%E5%AD%97156816857609508935')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365EF52CDF6D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a044c369-701e-0050-1a47-6879f4000000',
  'x-ms-client-request-id',
  'c0a0f404-d0d4-4810-905a-4fe67538e258',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:22:56 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:55 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash156816856896007000')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash156816856896007000\"><Prefix>////Upper/blob/empty /another 汉字156816857609508935</Prefix><Blobs><Blob><Name>////Upper/blob/empty /another 汉字156816857609508935</Name><Properties><Creation-Time>Wed, 11 Sep 2019 02:22:56 GMT</Creation-Time><Last-Modified>Wed, 11 Sep 2019 02:22:56 GMT</Last-Modified><Etag>0x8D7365EF52CDF6D</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64>PiO3pTJ67n0=</Content-CRC64><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><TagCount>0</TagCount></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a044c40b-701e-0050-2947-6879f4000000',
  'x-ms-client-request-id',
  '6f64a7d8-1b33-48d2-8838-9434698636a9',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:56 GMT' ]);

