let nock = require('nock');

module.exports.hash = "785a27c83e6f1c1d7dba9b80b9d4addd";

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash165899641924208231","عربي/عربى":"عربي/عربى165899641934304313"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899641924208231')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:19 GMT',
  'ETag',
  '"0x8DA70720265883D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce3ad-301e-0001-345a-a2bb65000000',
  'x-ms-client-request-id',
  '18082bbc-bf73-4af7-b7bc-5ba9ac11bd65',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899641924208231/%D8%B9%D8%B1%D8%A8%D9%8A/%D8%B9%D8%B1%D8%A8%D9%89165899641934304313', "A")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:19 GMT',
  'ETag',
  '"0x8DA7072027777C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce3cc-301e-0001-515a-a2bb65000000',
  'x-ms-client-request-id',
  '4c3d7811-feed-42d4-a203-459aa84ad21c',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash165899641924208231/%D8%B9%D8%B1%D8%A8%D9%8A/%D8%B9%D8%B1%D8%A8%D9%89165899641934304313')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7072027777C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce3ec-301e-0001-6c5a-a2bb65000000',
  'x-ms-client-request-id',
  'bcd359dc-b937-4387-af3b-1bf47d45c2b6',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:20:19 GMT',
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
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash165899641924208231')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash165899641924208231\"><Prefix>عربي/عربى165899641934304313</Prefix><Blobs><Blob><Name>عربي/عربى165899641934304313</Name><Properties><Creation-Time>Thu, 28 Jul 2022 08:20:19 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 08:20:19 GMT</Last-Modified><Etag>0x8DA7072027777C7</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce417-301e-0001-125a-a2bb65000000',
  'x-ms-client-request-id',
  '31b8f579-5a5e-4f5e-9c13-7da0fadacd32',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash165899641924208231')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce43d-301e-0001-365a-a2bb65000000',
  'x-ms-client-request-id',
  '446dd4c2-9678-4d91-94af-d0a45472d1b2',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);
