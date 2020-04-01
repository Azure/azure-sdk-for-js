let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash158018564730401913","汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'158018564765001227"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018564730401913')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:27 GMT',
  'ETag',
  '"0x8D7A3AA61BF3AF3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d9f8329-001e-0010-4c93-d5501a000000',
  'x-ms-client-request-id',
  'ad88752d-f97d-4e29-bd2f-531bd561f45e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:26 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018564730401913/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27158018564765001227', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:27 GMT',
  'ETag',
  '"0x8D7A3AA61F50D6C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '891e4cc0-701e-0014-3693-d5a598000000',
  'x-ms-client-request-id',
  'c8677a3e-d8ab-453f-8422-ea24e05b44f2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Jan 2020 04:27:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash158018564730401913/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27158018564765001227')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7A3AA61F50D6C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '891e4cda-701e-0014-4e93-d5a598000000',
  'x-ms-client-request-id',
  'fcb85f47-004c-408f-a6d2-deb2be2306f7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 28 Jan 2020 04:27:27 GMT',
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
  'Tue, 28 Jan 2020 04:27:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash158018564730401913')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash158018564730401913\"><Prefix>汉字. special ~!@#$%^&amp;*()_+`1234567890-={}|[]/:\";'&lt;&gt;?,/'158018564765001227</Prefix><Blobs><Blob><Name>汉字. special ~!@#$%^&amp;*()_+`1234567890-={}|[]/:\";'&lt;&gt;?,/'158018564765001227</Name><Properties><Creation-Time>Tue, 28 Jan 2020 04:27:27 GMT</Creation-Time><Last-Modified>Tue, 28 Jan 2020 04:27:27 GMT</Last-Modified><Etag>0x8D7A3AA61F50D6C</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d9f83c8-001e-0010-5b93-d5501a000000',
  'x-ms-client-request-id',
  'de1bedcd-305e-49ac-b364-699ca1da1f8d',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 28 Jan 2020 04:27:27 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash158018564730401913')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d9f83dc-001e-0010-6f93-d5501a000000',
  'x-ms-client-request-id',
  '54803434-ede4-4a93-b669-8cb9611085b3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:27 GMT' ]);
