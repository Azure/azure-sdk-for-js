let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash158018565218806901","عربي/عربى":"عربي/عربى158018565252204590"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018565218806901')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:32 GMT',
  'ETag',
  '"0x8D7A3AA64A6F4F4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a5463b7-601e-0066-4793-d5d4a6000000',
  'x-ms-client-request-id',
  '4cfbd779-6adf-41da-b1f8-9a78f621081e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:32 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018565218806901/%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89158018565252204590', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:32 GMT',
  'ETag',
  '"0x8D7A3AA64DBE93C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bd86841-401e-0017-4a93-d5a69f000000',
  'x-ms-client-request-id',
  'fc00d5b5-1dcd-41cd-b0b0-30988532e829',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Jan 2020 04:27:31 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash158018565218806901/%D8%B9%D8%B1%D8%A8%D9%8A%2F%D8%B9%D8%B1%D8%A8%D9%89158018565252204590')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:32 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7A3AA64DBE93C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bd86867-401e-0017-6b93-d5a69f000000',
  'x-ms-client-request-id',
  '283e6f24-17b4-4640-8074-e239cccf2974',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 28 Jan 2020 04:27:32 GMT',
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
  .get('/1container-with-dash158018565218806901')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash158018565218806901\"><Prefix>عربي/عربى158018565252204590</Prefix><Blobs><Blob><Name>عربي/عربى158018565252204590</Name><Properties><Creation-Time>Tue, 28 Jan 2020 04:27:32 GMT</Creation-Time><Last-Modified>Tue, 28 Jan 2020 04:27:32 GMT</Last-Modified><Etag>0x8D7A3AA64DBE93C</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a5464a8-601e-0066-2a93-d5d4a6000000',
  'x-ms-client-request-id',
  '994d0e78-67c2-42b7-ab1c-765d26f14438',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 28 Jan 2020 04:27:32 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash158018565218806901')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a5464d8-601e-0066-5893-d5d4a6000000',
  'x-ms-client-request-id',
  'eafc386d-c73b-48b2-b604-d358c744a2be',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:32 GMT' ]);
