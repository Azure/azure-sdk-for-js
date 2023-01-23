let nock = require('nock');

module.exports.hash = "50a564171a05c584c1936e8d7bdac701";

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash165899641975800053","にっぽんご/にほんご":"にっぽんご/にほんご165899641986002386"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899641975800053')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:20 GMT',
  'ETag',
  '"0x8DA707202B43928"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce46a-301e-0001-5d5a-a2bb65000000',
  'x-ms-client-request-id',
  '94be08ba-9fb9-4c11-b684-8794d52d3121',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899641975800053/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94/%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94165899641986002386', "A")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:20 GMT',
  'ETag',
  '"0x8DA707202C60055"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce49e-301e-0001-085a-a2bb65000000',
  'x-ms-client-request-id',
  'd19d893c-9aa3-4dc9-8f44-68b40628eb75',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash165899641975800053/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94/%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94165899641986002386')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA707202C60055"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce4e5-301e-0001-495a-a2bb65000000',
  'x-ms-client-request-id',
  'cab3b49c-b550-49a8-aedb-60bb03db53fa',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:20:20 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash165899641975800053')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash165899641975800053\"><Prefix>にっぽんご/にほんご165899641986002386</Prefix><Blobs><Blob><Name>にっぽんご/にほんご165899641986002386</Name><Properties><Creation-Time>Thu, 28 Jul 2022 08:20:20 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 08:20:20 GMT</Last-Modified><Etag>0x8DA707202C60055</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce508-301e-0001-655a-a2bb65000000',
  'x-ms-client-request-id',
  'bf9afe70-004a-467e-a8a1-1aacd9a0015f',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:20:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash165899641975800053')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce51e-301e-0001-7a5a-a2bb65000000',
  'x-ms-client-request-id',
  '61479d7e-878a-4486-b81b-069756bed314',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:20:19 GMT'
]);
