let nock = require('nock');

module.exports.hash = "ac99b21fb5d35030f069157846c8dc26";

module.exports.testInfo = {"uniqueName":{"share":"share160093496883503959","dir":"dir160093496910602647","file":"file160093496938007000"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:28 GMT',
  'ETag',
  '"0x8D86061290F6335"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc483e-101a-0013-5d4a-92d4a8000000',
  'x-ms-client-request-id',
  '59dd1dec-53d7-425d-9666-30324334ccd5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959/dir160093496910602647')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:29 GMT',
  'ETag',
  '"0x8D86061293946B7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc484b-101a-0013-684a-92d4a8000000',
  'x-ms-client-request-id',
  'bc262d54-df93-495e-9ddd-a70b5a28a433',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-24T08:09:29.2638903Z',
  'x-ms-file-last-write-time',
  '2020-09-24T08:09:29.2638903Z',
  'x-ms-file-creation-time',
  '2020-09-24T08:09:29.2638903Z',
  'x-ms-file-permission-key',
  '2065021814682187374*8391130200578712039',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959/dir160093496910602647/file160093496938007000')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:29 GMT',
  'ETag',
  '"0x8D8606129631D77"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4853-101a-0013-704a-92d4a8000000',
  'x-ms-client-request-id',
  '11131696-c253-456e-9f8e-a61a0944b783',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-24T08:09:29.5380855Z',
  'x-ms-file-last-write-time',
  '2020-09-24T08:09:29.5380855Z',
  'x-ms-file-creation-time',
  '2020-09-24T08:09:29.5380855Z',
  'x-ms-file-permission-key',
  '15912238054059149673*8391130200578712039',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959/dir160093496910602647/file160093496938007000', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:29 GMT',
  'ETag',
  '"0x8D86061298D4262"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc485c-101a-0013-794a-92d4a8000000',
  'x-ms-client-request-id',
  'cd93303c-ce01-4083-b7fc-2b328923923c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:28 GMT',
  'ETag',
  '"0x8D86061290F6335"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4863-101a-0013-804a-92d4a8000000',
  'x-ms-client-request-id',
  'fe65db0f-b63c-4519-80a3-e3af8225d632',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-09-24T08:09:30.0000000Z',
  'Date',
  'Thu, 24 Sep 2020 08:09:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959/dir160093496910602647/file160093496938007000')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:30 GMT',
  'ETag',
  '"0x8D8606129DFB72A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4869-101a-0013-054a-92d4a8000000',
  'x-ms-client-request-id',
  'd491fba3-2005-47e9-9faf-4096b8778b1f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959/dir160093496910602647/file160093496938007000', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:30 GMT',
  'ETag',
  '"0x8D860612A0A032E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc486f-101a-0013-0b4a-92d4a8000000',
  'x-ms-client-request-id',
  'd12a56d1-1338-4cc2-b596-8ef86649f216',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:28 GMT',
  'ETag',
  '"0x8D86061290F6335"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4878-101a-0013-144a-92d4a8000000',
  'x-ms-client-request-id',
  'f0fd6edd-c08f-4124-a1bd-66ae79c8eff9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-09-24T08:09:31.0000000Z',
  'Date',
  'Thu, 24 Sep 2020 08:09:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496883503959/dir160093496910602647/file160093496938007000', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:31 GMT',
  'ETag',
  '"0x8D860612A5D899F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4881-101a-0013-1d4a-92d4a8000000',
  'x-ms-client-request-id',
  '1c5b2cfc-0311-4c82-89b8-d6f043a1bf99',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160093496883503959/dir160093496910602647/file160093496938007000')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:30 GMT',
  'ETag',
  '"0x8D860612A0A032E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4889-101a-0013-254a-92d4a8000000',
  'x-ms-client-request-id',
  'f2c78a6e-252c-4d5f-8a83-673ab8aed286',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Sep 2020 08:09:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160093496883503959')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4893-101a-0013-2d4a-92d4a8000000',
  'x-ms-client-request-id',
  '1714bda0-94df-46bb-8f22-38b198f63de0',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:31 GMT'
]);
