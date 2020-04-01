let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash158018563957509762","blob empty":"blob empty158018563991707816"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018563957509762')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:19 GMT',
  'ETag',
  '"0x8D7A3AA5D238CDC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87aea962-101e-0026-6993-d5fd48000000',
  'x-ms-client-request-id',
  '54934dcf-453c-4a44-b6ad-6c4addbc31aa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:19 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018563957509762/blob%20empty158018563991707816', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:20 GMT',
  'ETag',
  '"0x8D7A3AA5D5A1934"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f219ea5-101e-000f-2493-d58b0a000000',
  'x-ms-client-request-id',
  '5126478d-c74b-45b1-8073-fc4bcc7c2fb1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Jan 2020 04:27:19 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash158018563957509762')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash158018563957509762\"><Prefix>blob empty158018563991707816</Prefix><Blobs><Blob><Name>blob empty158018563991707816</Name><Properties><Creation-Time>Tue, 28 Jan 2020 04:27:20 GMT</Creation-Time><Last-Modified>Tue, 28 Jan 2020 04:27:20 GMT</Last-Modified><Etag>0x8D7A3AA5D5A1934</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87aea9bb-101e-0026-3493-d5fd48000000',
  'x-ms-client-request-id',
  '2c44dcac-ebd9-4966-94d0-fd1b33483a63',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 28 Jan 2020 04:27:19 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash158018563957509762')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87aea9c7-101e-0026-3e93-d5fd48000000',
  'x-ms-client-request-id',
  '7977a72e-3497-4999-a8ff-16399e18a878',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:20 GMT' ]);
