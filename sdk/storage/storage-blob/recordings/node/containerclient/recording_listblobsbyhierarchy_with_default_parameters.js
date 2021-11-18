let nock = require('nock');

module.exports.hash = "9d93248e467ebd9afc3028d08238e416";

module.exports.testInfo = {"uniqueName":{"container":"container163659986941808803","blockblob0/0":"blockblob0/0163659987100100201","blockblob1/1":"blockblob1/1163659987197101357","blockblob2/2":"blockblob2/2163659987293305024"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659986941808803')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:31 GMT',
  'ETag',
  '"0x8D9A4BFFB38F724"',
  'x-ms-request-id',
  '2d58b3e6-701e-0001-44a8-d62f85000000',
  'x-ms-client-request-id',
  '7a8da9fd-f7e1-4d0c-a769-3fce810f0074',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 11 Nov 2021 03:04:30 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659986941808803/blockblob0%2F0163659987100100201')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:32 GMT',
  'ETag',
  '"0x8D9A4BFFBCFD52D"',
  'x-ms-request-id',
  'de618ad0-c01e-0002-15a8-d65283000000',
  'x-ms-client-request-id',
  'd05c25c3-21d4-4c7d-acde-067c68591ea3',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659986941808803/blockblob1%2F1163659987197101357')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:32 GMT',
  'ETag',
  '"0x8D9A4BFFC62C650"',
  'x-ms-request-id',
  '842600a8-501e-0003-2ba8-d67981000000',
  'x-ms-client-request-id',
  '45820224-1734-413f-bfcd-c896c8b48cd9',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163659986941808803/blockblob2%2F2163659987293305024')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 11 Nov 2021 03:04:33 GMT',
  'ETag',
  '"0x8D9A4BFFCF43154"',
  'x-ms-request-id',
  'd767308a-101e-0007-1ba8-d6d589000000',
  'x-ms-client-request-id',
  '1d2bba42-719a-429f-8cc8-2d1ab15dc657',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 11 Nov 2021 03:04:33 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163659986941808803')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163659986941808803\"><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix><BlobPrefix><Name>blockblob1/</Name></BlobPrefix><BlobPrefix><Name>blockblob2/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '2d58b3ec-701e-0001-45a8-d62f85000000',
  'x-ms-client-request-id',
  '069b7b1c-c4b9-421f-b866-6d14d9e687c6',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 11 Nov 2021 03:04:34 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163659986941808803/blockblob0%2F0163659987100100201')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '62538e86-f01e-0009-33a8-d67794000000',
  'x-ms-client-request-id',
  'df61d5e5-8bd8-4131-bf53-5372924b4e92',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 11 Nov 2021 03:04:35 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163659986941808803/blockblob1%2F1163659987197101357')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'de618ad4-c01e-0002-18a8-d65283000000',
  'x-ms-client-request-id',
  '851ba707-6c08-4a69-a30f-71c045a653a8',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 11 Nov 2021 03:04:36 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163659986941808803/blockblob2%2F2163659987293305024')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '07c5bf37-a01e-0004-2fa8-d6a88f000000',
  'x-ms-client-request-id',
  '6d03bd01-ee14-48d0-9764-0f5816804c9d',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 11 Nov 2021 03:04:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163659986941808803')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '842600ac-501e-0003-2ca8-d67981000000',
  'x-ms-client-request-id',
  '09e1cf76-aa1d-488c-bdca-492167d8db80',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Thu, 11 Nov 2021 03:04:38 GMT',
  'Connection',
  'close'
]);
