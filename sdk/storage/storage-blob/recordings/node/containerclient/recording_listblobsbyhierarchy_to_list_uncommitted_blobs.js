let nock = require('nock');

module.exports.hash = "cef9eb0c4a960ce7d9173d1f266bf6d6";

module.exports.testInfo = {"uniqueName":{"container":"container165103876621000889","blockblob0":"blockblob0165103876648704792","blockblob1":"blockblob1165103876676805384","blockblob2":"blockblob2165103876705303123"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876621000889')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 27 Apr 2022 05:52:46 GMT',
  'ETag',
  '"0x8DA281227B5234C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2ceab-d01e-006a-66fb-5902ea000000',
  'x-ms-client-request-id',
  '9d92f20a-bd9a-4f4b-b922-7d36a8f5fda2',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Wed, 27 Apr 2022 05:52:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876621000889/blockblob0165103876648704792', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cf16-d01e-006a-41fb-5902ea000000',
  'x-ms-client-request-id',
  'c4852f90-2f0e-415c-a62c-0ddfd7db5224',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 27 Apr 2022 05:52:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876621000889/blockblob1165103876676805384', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2cfa9-d01e-006a-44fb-5902ea000000',
  'x-ms-client-request-id',
  '4414001d-4e82-4b59-ae15-0363fc6fdf5f',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 27 Apr 2022 05:52:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165103876621000889/blockblob2165103876705303123', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2d027-d01e-006a-30fb-5902ea000000',
  'x-ms-client-request-id',
  'c5f6180b-e93a-4fdd-8a21-81a5d88382bb',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 27 Apr 2022 05:52:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165103876621000889')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165103876621000889\"><Delimiter>/</Delimiter><Blobs><Blob><Name>blockblob0165103876648704792</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob1165103876676805384</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob2165103876705303123</Name><Properties><Content-Length>0</Content-Length><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2d093-d01e-006a-10fb-5902ea000000',
  'x-ms-client-request-id',
  '3837363c-dd6e-4b4f-9961-eb908f683891',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Wed, 27 Apr 2022 05:52:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876621000889/blockblob0165103876648704792')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2d118-d01e-006a-0afb-5902ea000000',
  'x-ms-client-request-id',
  '5fff4682-1099-4870-aa9f-cb9e867e1004',
  'x-ms-version',
  '2021-06-08',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 27 Apr 2022 05:52:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876621000889/blockblob1165103876676805384')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2d18f-d01e-006a-78fb-5902ea000000',
  'x-ms-client-request-id',
  'b8cf7548-f33c-467a-828f-4013655cb3f7',
  'x-ms-version',
  '2021-06-08',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 27 Apr 2022 05:52:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876621000889/blockblob2165103876705303123')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2d234-d01e-006a-06fb-5902ea000000',
  'x-ms-client-request-id',
  '93fe637e-58d4-4efe-94b2-102ecad5f3a3',
  'x-ms-version',
  '2021-06-08',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 27 Apr 2022 05:52:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165103876621000889')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bdb2d343-d01e-006a-72fb-5902ea000000',
  'x-ms-client-request-id',
  '3c409a82-d027-457d-b87f-adee11d03c14',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Wed, 27 Apr 2022 05:52:48 GMT'
]);
