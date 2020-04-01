let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash158018565505707754","にっぽんご/にほんご":"にっぽんご/にほんご158018565540201753"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018565505707754')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:35 GMT',
  'ETag',
  '"0x8D7A3AA665E0398"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b910a3e5-b01e-0046-0793-d5b86a000000',
  'x-ms-client-request-id',
  'd29b0538-3daf-4177-ae33-f7df78071acb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:35 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash158018565505707754/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%2F%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94158018565540201753', "A")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:35 GMT',
  'ETag',
  '"0x8D7A3AA66927338"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '710ed757-e01e-0038-2a93-d527a5000000',
  'x-ms-client-request-id',
  'b852dd65-fc33-43c5-bcee-0ff1cf9d6da3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 28 Jan 2020 04:27:34 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash158018565505707754/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%2F%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94158018565540201753')
  .reply(200, "", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 28 Jan 2020 04:27:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7A3AA66927338"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '710ed76b-e01e-0038-3a93-d527a5000000',
  'x-ms-client-request-id',
  '84a4f3a8-cb8d-411f-a601-8716814b7b30',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 28 Jan 2020 04:27:35 GMT',
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
  'Tue, 28 Jan 2020 04:27:34 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash158018565505707754')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash158018565505707754\"><Prefix>にっぽんご/にほんご158018565540201753</Prefix><Blobs><Blob><Name>にっぽんご/にほんご158018565540201753</Name><Properties><Creation-Time>Tue, 28 Jan 2020 04:27:35 GMT</Creation-Time><Last-Modified>Tue, 28 Jan 2020 04:27:35 GMT</Last-Modified><Etag>0x8D7A3AA66927338</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b910a501-b01e-0046-6c93-d5b86a000000',
  'x-ms-client-request-id',
  'e5b30e48-d5c9-4161-bc07-b998161e3b45',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 28 Jan 2020 04:27:35 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash158018565505707754')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b910a535-b01e-0046-1393-d5b86a000000',
  'x-ms-client-request-id',
  '7d1763fe-03f6-4171-ba2e-dbb02c300f9a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 28 Jan 2020 04:27:35 GMT' ]);
