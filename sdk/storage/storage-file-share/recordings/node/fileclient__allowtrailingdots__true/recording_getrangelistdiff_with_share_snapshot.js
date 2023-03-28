let nock = require('nock');

module.exports.hash = "33d492d603f2ae438316f5c957eb83e1";

module.exports.testInfo = {"uniqueName":{"share":"share167747748396007922","dir":"dir167747748421302958","file":"file167747748447306990"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:04 GMT',
  'ETag',
  '"0x8DB18879780D784"',
  'x-ms-request-id',
  'e51cf74e-601a-0004-3170-4a0ec4000000',
  'x-ms-client-request-id',
  '22c5ff42-853a-4446-91c9-774e10f24db6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922/dir167747748421302958....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:04 GMT',
  'ETag',
  '"0x8DB188797A9C532"',
  'x-ms-request-id',
  'e51cf751-601a-0004-3270-4a0ec4000000',
  'x-ms-client-request-id',
  'f9180503-4357-42f9-bd1e-c0bfe1f0fd7d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:04.7194418Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:04.7194418Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:04.7194418Z',
  'x-ms-file-permission-key',
  '13895902193744473398*5510371786133343095',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922/dir167747748421302958..../file167747748447306990....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:04 GMT',
  'ETag',
  '"0x8DB188797D047F4"',
  'x-ms-request-id',
  'e51cf754-601a-0004-3370-4a0ec4000000',
  'x-ms-client-request-id',
  'bd0ab9d6-3f2d-401c-8b4e-d7fe69e81a85',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:04.9718260Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:04.9718260Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:04.9718260Z',
  'x-ms-file-permission-key',
  '12560293872808033297*5510371786133343095',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922/dir167747748421302958..../file167747748447306990....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:05 GMT',
  'ETag',
  '"0x8DB188797F7BE7B"',
  'x-ms-request-id',
  'e51cf755-601a-0004-3470-4a0ec4000000',
  'x-ms-client-request-id',
  '64a60bd0-3a5f-44b8-a6fb-28a101a8b002',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:05.2304507Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:04 GMT',
  'ETag',
  '"0x8DB18879780D784"',
  'x-ms-request-id',
  'e51cf756-601a-0004-3570-4a0ec4000000',
  'x-ms-client-request-id',
  '978e51ac-75b9-437a-841d-fbadb4116e87',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T05:58:05.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922/dir167747748421302958..../file167747748447306990....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:05 GMT',
  'ETag',
  '"0x8DB18879844F4EF"',
  'x-ms-request-id',
  'e51cf757-601a-0004-3670-4a0ec4000000',
  'x-ms-client-request-id',
  'ff90fc2d-0735-4687-92c7-9ed674901cac',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:05.7364719Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922/dir167747748421302958..../file167747748447306990....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:05 GMT',
  'ETag',
  '"0x8DB1887986ACC49"',
  'x-ms-request-id',
  'e51cf758-601a-0004-3770-4a0ec4000000',
  'x-ms-client-request-id',
  '8dac20f9-ba78-4b72-a3e8-7427ece93057',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:05.9844681Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:04 GMT',
  'ETag',
  '"0x8DB18879780D784"',
  'x-ms-request-id',
  'e51cf759-601a-0004-3870-4a0ec4000000',
  'x-ms-client-request-id',
  '70d50b47-44d8-48a7-82ac-f01c4f2c52d0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T05:58:06.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748396007922/dir167747748421302958..../file167747748447306990....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:06 GMT',
  'ETag',
  '"0x8DB188798B89EB1"',
  'x-ms-request-id',
  'e51cf75a-601a-0004-3970-4a0ec4000000',
  'x-ms-client-request-id',
  '6af3fcb5-e297-40a9-a937-1cdc8535079c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:06.4944817Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747748396007922/dir167747748421302958..../file167747748447306990....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:05 GMT',
  'ETag',
  '"0x8DB1887986ACC49"',
  'x-ms-request-id',
  'e51cf75b-601a-0004-3a70-4a0ec4000000',
  'x-ms-client-request-id',
  '5bd6a07e-17f9-4748-ad06-50681c425557',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:58:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747748396007922')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf75e-601a-0004-3b70-4a0ec4000000',
  'x-ms-client-request-id',
  '7275c8ea-8d75-4505-93ce-9db71c792550',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:06 GMT'
]);
