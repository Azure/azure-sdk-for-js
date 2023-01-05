let nock = require('nock');

module.exports.hash = "924ceb7744182fd8020e80c1a0decc4c";

module.exports.testInfo = {"uniqueName":{"container":"container165899957636104377","blockblob/0":"blockblob/0165899957646301168","blockblob/1":"blockblob/1165899957656403743","blockblob/2":"blockblob/2165899957666400181"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957636104377')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:56 GMT',
  'ETag',
  '"0x8DA70795C308920"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba3c1-d01e-0054-4f62-a2abee000000',
  'x-ms-client-request-id',
  '5d0e30e8-c5eb-49ad-8f59-478304fd4337',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957636104377/blockblob/0165899957646301168', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba3d3-d01e-0054-5d62-a2abee000000',
  'x-ms-client-request-id',
  '8d3a5041-bb41-4879-a4a0-8aceaf89002b',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957636104377/blockblob/1165899957656403743', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba3f1-d01e-0054-7162-a2abee000000',
  'x-ms-client-request-id',
  'c64776bc-642b-4a75-bdb7-3f6f9422e7d9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957636104377/blockblob/2165899957666400181', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba3ff-d01e-0054-7f62-a2abee000000',
  'x-ms-client-request-id',
  'bc2dd8f3-8f63-4ea6-82c5-4569cf5b61cf',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899957636104377')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899957636104377\"><Blobs><Blob><Name>blockblob/0165899957646301168</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/1165899957656403743</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/2165899957666400181</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba414-d01e-0054-1062-a2abee000000',
  'x-ms-client-request-id',
  'ee15b9a6-a156-4402-8a11-4dd29ac34727',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957636104377/blockblob/0165899957646301168')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba43e-d01e-0054-3462-a2abee000000',
  'x-ms-client-request-id',
  '7e0c76f5-f176-4d28-b310-0f81777d9a60',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957636104377/blockblob/1165899957656403743')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba451-d01e-0054-4362-a2abee000000',
  'x-ms-client-request-id',
  'fd7b57a2-b88c-42ab-a2d0-f301250837aa',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:12:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957636104377/blockblob/2165899957666400181')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba467-d01e-0054-5462-a2abee000000',
  'x-ms-client-request-id',
  'e4482dc6-8bd0-4cb6-9068-958f6343b8d0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:12:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957636104377')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba477-d01e-0054-6262-a2abee000000',
  'x-ms-client-request-id',
  '11400bb4-d725-4d7b-bfe4-10a7a6440c9d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:57 GMT'
]);
