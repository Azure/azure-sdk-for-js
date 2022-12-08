let nock = require('nock');

module.exports.hash = "b4ac1f32fc6815294b334efcae0ce744";

module.exports.testInfo = {"uniqueName":{"container":"container165899958434206247","blockblob0/0":"blockblob0/0165899958444305388","blockblob1/1":"blockblob1/1165899958454303662","blockblob2/2":"blockblob2/2165899958464306196"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958434206247')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:04 GMT',
  'ETag',
  '"0x8DA707960F23FAE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba9af-d01e-0054-0e62-a2abee000000',
  'x-ms-client-request-id',
  'cf6d95d8-23a2-48de-8a88-d20cb7940507',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958434206247/blockblob0/0165899958444305388')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:04 GMT',
  'ETag',
  '"0x8DA7079610331A6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba9be-d01e-0054-1a62-a2abee000000',
  'x-ms-client-request-id',
  '084e2b38-72c2-4b65-980d-65136e6d3bd0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958434206247/blockblob1/1165899958454303662')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:04 GMT',
  'ETag',
  '"0x8DA707961129880"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba9d1-d01e-0054-2962-a2abee000000',
  'x-ms-client-request-id',
  'fa65e99b-fbc9-4436-b266-99a296aa2c39',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958434206247/blockblob2/2165899958464306196')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:04 GMT',
  'ETag',
  '"0x8DA70796121FF60"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba9de-d01e-0054-3362-a2abee000000',
  'x-ms-client-request-id',
  '4d60f109-409a-486e-a0cd-2b9eb9ceb6a5',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899958434206247')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899958434206247\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba9eb-d01e-0054-3d62-a2abee000000',
  'x-ms-client-request-id',
  '79d7b0e9-2fe8-4edc-88a7-c93ae7cd1418',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958434206247/blockblob0/0165899958444305388')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa15-d01e-0054-6262-a2abee000000',
  'x-ms-client-request-id',
  'ba3aad4e-566e-4cfa-9236-5589b8724a6d',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958434206247/blockblob1/1165899958454303662')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa31-d01e-0054-7962-a2abee000000',
  'x-ms-client-request-id',
  'b754ecc5-1c9b-4c79-84e0-64f97db0bd1f',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958434206247/blockblob2/2165899958464306196')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa40-d01e-0054-0362-a2abee000000',
  'x-ms-client-request-id',
  '39951eee-5ba0-4e5b-9b03-9289bfb1d3ae',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958434206247')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85baa4a-d01e-0054-0c62-a2abee000000',
  'x-ms-client-request-id',
  '84e47932-8b1a-4b59-bbdb-f36c9e0339f1',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:13:05 GMT'
]);
