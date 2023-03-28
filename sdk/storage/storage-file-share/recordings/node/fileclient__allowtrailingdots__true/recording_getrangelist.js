let nock = require('nock');

module.exports.hash = "6fbd4ff0485ca65d7d61fa0a9b52ce10";

module.exports.testInfo = {"uniqueName":{"share":"share167747747695107917","dir":"dir167747747720302490","file":"file167747747746206873"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747695107917')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:57 GMT',
  'ETag',
  '"0x8DB18879353CCAA"',
  'x-ms-request-id',
  'e51cf72c-601a-0004-1570-4a0ec4000000',
  'x-ms-client-request-id',
  'fae55d3f-49f4-4cad-bee4-dd8f748fe9cb',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747695107917/dir167747747720302490....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:57 GMT',
  'ETag',
  '"0x8DB1887937B312E"',
  'x-ms-request-id',
  'e51cf72f-601a-0004-1670-4a0ec4000000',
  'x-ms-client-request-id',
  'f9069106-b30d-4d8e-8230-5b205b9ec45c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:57.7033006Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:57.7033006Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:57.7033006Z',
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
  'Mon, 27 Feb 2023 05:57:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747695107917/dir167747747720302490..../file167747747746206873....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:57 GMT',
  'ETag',
  '"0x8DB188793A304B1"',
  'x-ms-request-id',
  'e51cf730-601a-0004-1770-4a0ec4000000',
  'x-ms-client-request-id',
  '2f1ec875-1dc3-43ce-942d-0c4797320cdc',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:57:57.9643057Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:57.9643057Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:57:57.9643057Z',
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
  'Mon, 27 Feb 2023 05:57:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747695107917/dir167747747720302490..../file167747747746206873....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:58 GMT',
  'ETag',
  '"0x8DB188793C95184"',
  'x-ms-request-id',
  'e51cf731-601a-0004-1870-4a0ec4000000',
  'x-ms-client-request-id',
  '7b95a057-1523-466f-950c-8a9ba6b1bdba',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:58.2153092Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747695107917/dir167747747720302490..../file167747747746206873....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:58 GMT',
  'ETag',
  '"0x8DB188793EF9E55"',
  'x-ms-request-id',
  'e51cf732-601a-0004-1970-4a0ec4000000',
  'x-ms-client-request-id',
  '4557b7c5-3577-4c94-be27-0c99eb00cd83',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:58.4663125Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:57:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747747695107917/dir167747747720302490..../file167747747746206873....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:58 GMT',
  'ETag',
  '"0x8DB188794152804"',
  'x-ms-request-id',
  'e51cf733-601a-0004-1a70-4a0ec4000000',
  'x-ms-client-request-id',
  '4a36837b-3730-492d-b40a-a4ed7b233eae',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:57:58.7123204Z',
  'Date',
  'Mon, 27 Feb 2023 05:57:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747747695107917/dir167747747720302490..../file167747747746206873....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:57:58 GMT',
  'ETag',
  '"0x8DB188794152804"',
  'x-ms-request-id',
  'e51cf734-601a-0004-1b70-4a0ec4000000',
  'x-ms-client-request-id',
  'c38eb6d9-0427-4cfd-b2c4-ebd5e78ae40e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:57:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747747695107917')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf736-601a-0004-1d70-4a0ec4000000',
  'x-ms-client-request-id',
  '0d32ab6b-8a3c-483b-ae2f-9432eab0cc8e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:57:59 GMT'
]);
