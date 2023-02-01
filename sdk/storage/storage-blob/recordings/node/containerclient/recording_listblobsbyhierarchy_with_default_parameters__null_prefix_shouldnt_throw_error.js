let nock = require('nock');

module.exports.hash = "459c714894a351a8ab3c6563d11587ee";

module.exports.testInfo = {"uniqueName":{"container":"container165899894008503348","blockblob0/0":"blockblob0/0165899894075903133","blockblob1/1":"blockblob1/1165899894086909632","blockblob2/2":"blockblob2/2165899894097200555"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894008503348')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:20 GMT',
  'ETag',
  '"0x8DA7077E1454229"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078dde4-301e-0011-1160-a27e0d000000',
  'x-ms-client-request-id',
  '178847dd-d728-4378-a979-b92159522023',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894008503348/blockblob0/0165899894075903133')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:21 GMT',
  'ETag',
  '"0x8DA7077E1594725"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078de08-301e-0011-2d60-a27e0d000000',
  'x-ms-client-request-id',
  '158123c8-9caa-490e-bcb6-fae89a49765d',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894008503348/blockblob1/1165899894086909632')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:21 GMT',
  'ETag',
  '"0x8DA7077E1692327"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078de44-301e-0011-6360-a27e0d000000',
  'x-ms-client-request-id',
  'f1fb7962-5012-4596-b66e-7705dc207306',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894008503348/blockblob2/2165899894097200555')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:21 GMT',
  'ETag',
  '"0x8DA7077E178D82E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078de68-301e-0011-0160-a27e0d000000',
  'x-ms-client-request-id',
  'c6808a70-d3d8-41d4-9979-df4ae93db987',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899894008503348')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899894008503348\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078de84-301e-0011-1960-a27e0d000000',
  'x-ms-client-request-id',
  '9c27dab3-bb7c-451a-8b15-8f862d7be29b',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894008503348/blockblob0/0165899894075903133')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078de9e-301e-0011-3060-a27e0d000000',
  'x-ms-client-request-id',
  '944f9469-f9bd-4e13-af1f-13e355afd9a5',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894008503348/blockblob1/1165899894086909632')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078deb4-301e-0011-4560-a27e0d000000',
  'x-ms-client-request-id',
  '92f7938d-ef30-4fa9-8fe1-be137c6036ea',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894008503348/blockblob2/2165899894097200555')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078decc-301e-0011-5a60-a27e0d000000',
  'x-ms-client-request-id',
  '6ccd411f-7647-46da-8430-fd988da23f92',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894008503348')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078deeb-301e-0011-7360-a27e0d000000',
  'x-ms-client-request-id',
  '8a78ffc4-eb54-4571-a57c-778556d462e9',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:02:20 GMT'
]);
