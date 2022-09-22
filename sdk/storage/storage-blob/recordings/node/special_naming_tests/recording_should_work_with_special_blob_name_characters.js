let nock = require('nock');

module.exports.hash = "a3e8f44b075dadc9dc9129794d451fba";

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash165899641814604988","汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'165899641878602248"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899641814604988')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:18 GMT',
  'ETag',
  '"0x8DA7072020D89DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce298-301e-0001-3c5a-a2bb65000000',
  'x-ms-client-request-id',
  'acc221d4-143e-49a2-b8e4-07188b816225',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899641814604988/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27165899641878602248', "A")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:20:19 GMT',
  'ETag',
  '"0x8DA707202240E1B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce2ec-301e-0001-055a-a2bb65000000',
  'x-ms-client-request-id',
  '5c8e8457-b4a1-4849-a160-5216ce5db7d9',
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
  .head('/1container-with-dash165899641814604988/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C/%27165899641878602248')
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
  '"0x8DA707202240E1B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce31c-301e-0001-305a-a2bb65000000',
  'x-ms-client-request-id',
  '8fb1b4fd-91d1-4bfb-8cf5-75f20ce58243',
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
  .get('/1container-with-dash165899641814604988')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash165899641814604988\"><Prefix>汉字. special ~!@#$%^&amp;*()_+`1234567890-={}|[]/:\";'&lt;&gt;?,/'165899641878602248</Prefix><Blobs><Blob><Name>汉字. special ~!@#$%^&amp;*()_+`1234567890-={}|[]/:\";'&lt;&gt;?,/'165899641878602248</Name><Properties><Creation-Time>Thu, 28 Jul 2022 08:20:19 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 08:20:19 GMT</Last-Modified><Etag>0x8DA707202240E1B</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce354-301e-0001-645a-a2bb65000000',
  'x-ms-client-request-id',
  '73e5b99d-37af-4a8d-bf26-0cdf52c5ee45',
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
  .delete('/1container-with-dash165899641814604988')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '966ce37f-301e-0001-0c5a-a2bb65000000',
  'x-ms-client-request-id',
  '0c55e4d6-cdf2-4a26-a740-c81d3a254977',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:20:18 GMT'
]);
