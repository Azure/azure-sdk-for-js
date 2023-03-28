let nock = require('nock');

module.exports.hash = "6fbd4ff0485ca65d7d61fa0a9b52ce10";

module.exports.testInfo = {"uniqueName":{"share":"share167747854981806178","dir":"dir167747855007107509","file":"file167747855032902424"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854981806178')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:50 GMT',
  'ETag',
  '"0x8DB188A12CFEE4C"',
  'x-ms-request-id',
  '1775e9bd-e01a-0001-2e72-4a1b65000000',
  'x-ms-client-request-id',
  '8219b413-06c4-4341-bbad-7af7d8889e90',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854981806178/dir167747855007107509....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:50 GMT',
  'ETag',
  '"0x8DB188A12F82834"',
  'x-ms-request-id',
  '1775e9bf-e01a-0001-2f72-4a1b65000000',
  'x-ms-client-request-id',
  'c3513fa2-5093-428a-8436-d5545e9aae9e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:50.5863732Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:50.5863732Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:50.5863732Z',
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
  'Mon, 27 Feb 2023 06:15:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854981806178/dir167747855007107509..../file167747855032902424....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:50 GMT',
  'ETag',
  '"0x8DB188A131F867F"',
  'x-ms-request-id',
  '1775e9c1-e01a-0001-3072-4a1b65000000',
  'x-ms-client-request-id',
  'ef68658b-3be5-47db-8cde-e7275ecc075e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T06:15:50.8443775Z',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:50.8443775Z',
  'x-ms-file-creation-time',
  '2023-02-27T06:15:50.8443775Z',
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
  'Mon, 27 Feb 2023 06:15:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854981806178/dir167747855007107509..../file167747855032902424....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:51 GMT',
  'ETag',
  '"0x8DB188A1347813A"',
  'x-ms-request-id',
  '1775e9cb-e01a-0001-3172-4a1b65000000',
  'x-ms-client-request-id',
  '9ab32418-0b0d-4696-a247-1824a487e8f0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:51.1063866Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854981806178/dir167747855007107509..../file167747855032902424....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:51 GMT',
  'ETag',
  '"0x8DB188A136EDF43"',
  'x-ms-request-id',
  '1775e9cc-e01a-0001-3272-4a1b65000000',
  'x-ms-client-request-id',
  'a9426524-be41-4152-8e06-94a6ac8141d9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:51.3643843Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 06:15:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747854981806178/dir167747855007107509..../file167747855032902424....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:51 GMT',
  'ETag',
  '"0x8DB188A1394B714"',
  'x-ms-request-id',
  '1775e9ce-e01a-0001-3372-4a1b65000000',
  'x-ms-client-request-id',
  '82de86d9-a44b-4943-9a46-dc26de8f91a3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T06:15:51.6123924Z',
  'Date',
  'Mon, 27 Feb 2023 06:15:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747854981806178/dir167747855007107509..../file167747855032902424....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 06:15:51 GMT',
  'ETag',
  '"0x8DB188A1394B714"',
  'x-ms-request-id',
  '1775e9cf-e01a-0001-3472-4a1b65000000',
  'x-ms-client-request-id',
  '066564ca-7ffe-427b-8ce6-712eff51b130',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 06:15:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747854981806178')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '1775e9d0-e01a-0001-3572-4a1b65000000',
  'x-ms-client-request-id',
  'e86e4fc5-f909-46c1-ae40-493a8f9e9fbd',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 06:15:51 GMT'
]);
