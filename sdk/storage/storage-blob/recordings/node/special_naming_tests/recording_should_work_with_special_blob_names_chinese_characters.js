let nock = require('nock');

module.exports.hash = "a5ccd1352b0f424a08a5e84536559ab4";

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash165899673442401637","////Upper/blob/empty /another 汉字":"////Upper/blob/empty /another 汉字165899673452609363"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899673442401637')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:25:34 GMT',
  'ETag',
  '"0x8DA7072BE428C54"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b57c0c2-701e-0000-525b-a2e4b9000000',
  'x-ms-client-request-id',
  '9a725c32-13aa-4404-b1fe-c8a9f191412b',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:25:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash165899673442401637/////Upper/blob/empty%20/another%20%E6%B1%89%E5%AD%97165899673452609363', "A")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:25:34 GMT',
  'ETag',
  '"0x8DA7072BE53E588"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b57c0ee-701e-0000-735b-a2e4b9000000',
  'x-ms-client-request-id',
  'bb5e37c4-edcb-4548-a4f3-1efe13559932',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:25:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash165899673442401637/////Upper/blob/empty%20/another%20%E6%B1%89%E5%AD%97165899673452609363')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:25:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7072BE53E588"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b57c114-701e-0000-0d5b-a2e4b9000000',
  'x-ms-client-request-id',
  'e47b84f6-8018-4ed7-84d0-22dab40895d2',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:25:34 GMT',
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
  'Thu, 28 Jul 2022 08:25:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash165899673442401637')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash165899673442401637\"><Prefix>////Upper/blob/empty /another 汉字165899673452609363</Prefix><Blobs><Blob><Name>////Upper/blob/empty /another 汉字165899673452609363</Name><Properties><Creation-Time>Thu, 28 Jul 2022 08:25:34 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 08:25:34 GMT</Last-Modified><Etag>0x8DA7072BE53E588</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b57c13d-701e-0000-295b-a2e4b9000000',
  'x-ms-client-request-id',
  '57700971-2fbd-4efa-aa0e-d4f159a6c61c',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:25:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash165899673442401637')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b57c183-701e-0000-615b-a2e4b9000000',
  'x-ms-client-request-id',
  '29d16ded-b076-4afc-b4df-4387868f4ee3',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:25:34 GMT'
]);
