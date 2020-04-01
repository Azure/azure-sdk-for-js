let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash158018565124304472","عربي/عربى":"عربي/عربى158018565158900123"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018565124304472')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:31 GMT',
  'ETag',
  '"0x8D7A3AA641816A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d9f8739-001e-0010-1193-d5501a000000',
  'x-ms-client-request-id',
  'cc049155-b70a-491f-8560-21efa2d57daa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:30 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018565124304472/%25D8%25B9%25D8%25B1%25D8%25A8%25D9%258A%252F%25D8%25B9%25D8%25B1%25D8%25A8%25D9%2589158018565158900123', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:31 GMT',
  'ETag',
  '"0x8D7A3AA644D727C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94ea47b0-101e-0069-7993-d53950000000',
  'x-ms-client-request-id',
  '06e133b3-e15a-4a65-b09d-8b16f71b1a4d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Jan 2020 04:27:31 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash158018565124304472/%25D8%25B9%25D8%25B1%25D8%25A8%25D9%258A%252F%25D8%25B9%25D8%25B1%25D8%25A8%25D9%2589158018565158900123')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7A3AA644D727C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94ea47c8-101e-0069-0e93-d53950000000',
  'x-ms-client-request-id',
  'e2a50850-4143-465c-b354-d8518848ba88',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 28 Jan 2020 04:27:31 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 28 Jan 2020 04:27:31 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash158018565124304472')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash158018565124304472\"><Prefix>%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89158018565158900123</Prefix><Blobs><Blob><Name>%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89158018565158900123</Name><Properties><Creation-Time>Tue, 28 Jan 2020 04:27:31 GMT</Creation-Time><Last-Modified>Tue, 28 Jan 2020 04:27:31 GMT</Last-Modified><Etag>0x8D7A3AA644D727C</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d9f87a9-001e-0010-7a93-d5501a000000',
  'x-ms-client-request-id',
  'bb9dab6b-dc45-4beb-9ce6-f5102d08c22b',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 28 Jan 2020 04:27:31 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash158018565124304472')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d9f87d5-001e-0010-2293-d5501a000000',
  'x-ms-client-request-id',
  '2123bbf0-9e38-419d-b3c2-9a661bbf8157',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:31 GMT' ]);
