let nock = require('nock');

module.exports.hash = "9d93248e467ebd9afc3028d08238e416";

module.exports.testInfo = {"uniqueName":{"container":"container163764847399101586","blockblob0/0":"blockblob0/0163764847423307029","blockblob1/1":"blockblob1/1163764847448100326","blockblob2/2":"blockblob2/2163764847472702491"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847399101586')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:14 GMT',
  'ETag',
  '"0x8D9AE4973646AA4"',
  'x-ms-request-id',
  'e179331b-501e-0003-1a32-e07981000000',
  'x-ms-client-request-id',
  '9f12c0a1-9c79-434c-b8c2-ab438e6774c9',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847399101586/blockblob0%2F0163764847423307029')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:14 GMT',
  'ETag',
  '"0x8D9AE49738A875C"',
  'x-ms-request-id',
  'e179331d-501e-0003-1b32-e07981000000',
  'x-ms-client-request-id',
  '80f0d7bc-5df0-440d-ba25-2572bac7ba4b',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847399101586/blockblob1%2F1163764847448100326')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:14 GMT',
  'ETag',
  '"0x8D9AE4973B012D2"',
  'x-ms-request-id',
  'e1793320-501e-0003-1e32-e07981000000',
  'x-ms-client-request-id',
  'd9a2f408-61d7-476c-8e58-325e03952606',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847399101586/blockblob2%2F2163764847472702491')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:14 GMT',
  'ETag',
  '"0x8D9AE4973D59A3D"',
  'x-ms-request-id',
  'e1793321-501e-0003-1f32-e07981000000',
  'x-ms-client-request-id',
  'fccb47f9-858a-4289-b2df-3c6d8e748c54',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163764847399101586')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163764847399101586\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e1793322-501e-0003-2032-e07981000000',
  'x-ms-client-request-id',
  '6ffec78e-aa12-430a-bf13-727b98abcfc7',
  'x-ms-version',
  '2021-02-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 23 Nov 2021 06:21:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847399101586/blockblob0%2F0163764847423307029')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793323-501e-0003-2132-e07981000000',
  'x-ms-client-request-id',
  '92e23781-9cca-43d1-ae20-3c5e28d74ec2',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847399101586/blockblob1%2F1163764847448100326')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793324-501e-0003-2232-e07981000000',
  'x-ms-client-request-id',
  '7a3d8d27-c8aa-439f-bf34-4509b3553703',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847399101586/blockblob2%2F2163764847472702491')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793325-501e-0003-2332-e07981000000',
  'x-ms-client-request-id',
  'e738ff4d-71b6-4621-9192-5e993e01b1b3',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847399101586')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793326-501e-0003-2432-e07981000000',
  'x-ms-client-request-id',
  'f15f9405-9ad8-49cf-bd7d-8099bc66fb6d',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:15 GMT'
]);
