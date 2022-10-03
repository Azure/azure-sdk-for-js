let nock = require('nock');

module.exports.hash = "bd55f9cc77d519a3e3c2fc810b4a330b";

module.exports.testInfo = {"uniqueName":{"container":"container165103876256802377","blockblob/0":"blockblob/0165103876393906476","blockblob/1":"blockblob/1165103876422301699","blockblob/2":"blockblob/2165103876450106623"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876256802377')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 27 Apr 2022 05:52:44 GMT',
  'ETag',
  '"0x8DA2812262DFA00"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2c98d-d01e-006a-56fb-5902ea000000',
  'x-ms-client-request-id',
  '33c522c5-510c-45d9-a434-3078fb189548',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Wed, 27 Apr 2022 05:52:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876256802377/blockblob%2F0165103876393906476', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2ca83-d01e-006a-36fb-5902ea000000',
  'x-ms-client-request-id',
  'd91c3b97-7498-4a2d-b904-b7310f0c4ae8',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 27 Apr 2022 05:52:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876256802377/blockblob%2F1165103876422301699', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cb2f-d01e-006a-5bfb-5902ea000000',
  'x-ms-client-request-id',
  'ef618368-d052-4a05-9bf9-480cefb85ff4',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 27 Apr 2022 05:52:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876256802377/blockblob%2F2165103876450106623', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cbb8-d01e-006a-4efb-5902ea000000',
  'x-ms-client-request-id',
  '7448c9e7-d9c9-4f29-83ca-ce683e5eec3f',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 27 Apr 2022 05:52:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165103876256802377')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165103876256802377\"><Blobs><Blob><Name>blockblob/0165103876393906476</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/1165103876422301699</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/2165103876450106623</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cc56-d01e-006a-4ffb-5902ea000000',
  'x-ms-client-request-id',
  'f2862285-55b0-4daa-9138-c9b3be1a7215',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Wed, 27 Apr 2022 05:52:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876256802377/blockblob%2F0165103876393906476')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2ccbc-d01e-006a-29fb-5902ea000000',
  'x-ms-client-request-id',
  '420c9573-4623-4c9d-90f4-861110de9476',
  'x-ms-version',
  '2021-06-08',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 27 Apr 2022 05:52:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876256802377/blockblob%2F1165103876422301699')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cd2a-d01e-006a-0dfb-5902ea000000',
  'x-ms-client-request-id',
  '4e42dc70-4a56-4adc-b634-98772a05fd94',
  'x-ms-version',
  '2021-06-08',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 27 Apr 2022 05:52:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876256802377/blockblob%2F2165103876450106623')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cdba-d01e-006a-0ffb-5902ea000000',
  'x-ms-client-request-id',
  '0ede6cca-d190-46e7-ae09-3e33b5b89473',
  'x-ms-version',
  '2021-06-08',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 27 Apr 2022 05:52:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876256802377')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2ce3f-d01e-006a-7ffb-5902ea000000',
  'x-ms-client-request-id',
  '05869850-6094-494a-a621-2a36a39534c0',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Wed, 27 Apr 2022 05:52:45 GMT'
]);
