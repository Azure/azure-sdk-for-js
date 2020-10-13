let nock = require('nock');

module.exports.hash = "c882d73842127a37a7d097e998563de1";

module.exports.testInfo = {"uniqueName":{"share":"share160093496636805058","dir":"dir160093496663502172","file":"file160093496691709903"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:26 GMT',
  'ETag',
  '"0x8D860612796617E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc47fb-101a-0013-204a-92d4a8000000',
  'x-ms-client-request-id',
  'b6b37d5c-62c8-4894-b34f-2f3326253c60',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058/dir160093496663502172')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:26 GMT',
  'ETag',
  '"0x8D8606127C17D5D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4802-101a-0013-264a-92d4a8000000',
  'x-ms-client-request-id',
  '6cbd36a6-cff3-43c4-9570-397852d72d50',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-24T08:09:26.8011357Z',
  'x-ms-file-last-write-time',
  '2020-09-24T08:09:26.8011357Z',
  'x-ms-file-creation-time',
  '2020-09-24T08:09:26.8011357Z',
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
  'Thu, 24 Sep 2020 08:09:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058/dir160093496663502172/file160093496691709903')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:27 GMT',
  'ETag',
  '"0x8D8606127EBA251"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4809-101a-0013-2c4a-92d4a8000000',
  'x-ms-client-request-id',
  '6cdbf550-0f4e-4494-80e3-1a743894aea8',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-24T08:09:27.0773329Z',
  'x-ms-file-last-write-time',
  '2020-09-24T08:09:27.0773329Z',
  'x-ms-file-creation-time',
  '2020-09-24T08:09:27.0773329Z',
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
  'Thu, 24 Sep 2020 08:09:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058/dir160093496663502172/file160093496691709903', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:27 GMT',
  'ETag',
  '"0x8D8606128152AE3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc480e-101a-0013-314a-92d4a8000000',
  'x-ms-client-request-id',
  'add8c753-ae6e-4012-bd08-c1181d0cc3bb',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:26 GMT',
  'ETag',
  '"0x8D860612796617E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4813-101a-0013-364a-92d4a8000000',
  'x-ms-client-request-id',
  'b093cd21-642d-4506-9547-b124b9f1062d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-09-24T08:09:27.0000000Z',
  'Date',
  'Thu, 24 Sep 2020 08:09:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058/dir160093496663502172/file160093496691709903')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:27 GMT',
  'ETag',
  '"0x8D860612867788E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc481a-101a-0013-3c4a-92d4a8000000',
  'x-ms-client-request-id',
  '2cc2840a-54f4-409a-b6d9-442da3381937',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160093496636805058/dir160093496663502172/file160093496691709903', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:28 GMT',
  'ETag',
  '"0x8D860612890B2F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4822-101a-0013-434a-92d4a8000000',
  'x-ms-client-request-id',
  'bbf6b3a3-2fea-4bc8-b549-722af5bdc2da',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Thu, 24 Sep 2020 08:09:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160093496636805058/dir160093496663502172/file160093496691709903')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 24 Sep 2020 08:09:28 GMT',
  'ETag',
  '"0x8D860612890B2F6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc482b-101a-0013-4c4a-92d4a8000000',
  'x-ms-client-request-id',
  '41c801f7-f850-4164-a7bb-166370c2ab3f',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 24 Sep 2020 08:09:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160093496636805058')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57bc4835-101a-0013-544a-92d4a8000000',
  'x-ms-client-request-id',
  '02bf2ca1-1ab0-4d98-89a0-ed1b43b652ef',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 24 Sep 2020 08:09:28 GMT'
]);
