let nock = require('nock');

module.exports.hash = "e6eac8f968c0c1da4693e985a3ba89c4";

module.exports.testInfo = {"uniqueName":{"share":"share163946894089809349","dir":"dir163946894187207588","file":"file163946894284503736","sourcefile":"sourcefile163946894284601578","destfile":"destfile163946894382906531"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894089809349')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:21 GMT',
  'ETag',
  '"0x8D9BED80EC129C3"',
  'x-ms-request-id',
  'a41741dd-e01a-0007-55c0-f0fda4000000',
  'x-ms-client-request-id',
  '2633c07a-4746-45e0-96e4-c545ebf2d30c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:21 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894089809349/dir163946894187207588')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:22 GMT',
  'ETag',
  '"0x8D9BED80F568356"',
  'x-ms-request-id',
  '55e37ee4-701a-0008-66c0-f0c247000000',
  'x-ms-client-request-id',
  '21ce791e-fc4f-470f-94cb-63c2011959fd',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:22.9177174Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:22.9177174Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:22.9177174Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:22 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894089809349/sourcefile163946894284601578')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:23 GMT',
  'ETag',
  '"0x8D9BED80FED9573"',
  'x-ms-request-id',
  '39e28cc3-a01a-0003-08c0-f01608000000',
  'x-ms-client-request-id',
  '93aac5cc-6cc8-48df-8db0-575f7f77976d',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:23 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894089809349/destfile163946894382906531')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:24 GMT',
  'ETag',
  '"0x8D9BED81082ABBF"',
  'x-ms-request-id',
  '88abb40a-601a-0004-69c0-f00ec4000000',
  'x-ms-client-request-id',
  'd88b6cd0-2550-4ba6-87d2-78f070f44310',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:24.8848319Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:24.8848319Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:24.8848319Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'ReadOnly | Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:24 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946894089809349/destfile163946894382906531')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:25 GMT',
  'ETag',
  '"0x8D9BED8111A59F9"',
  'x-ms-request-id',
  '888d3560-a01a-0005-10c0-f0f0c9000000',
  'x-ms-client-request-id',
  'd3793464-32b1-4ae9-a66f-a963fe5f987c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:25.8788857Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:25 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946894089809349/destfile163946894382906531')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:25 GMT',
  'ETag',
  '"0x8D9BED8111A59F9"',
  'x-ms-request-id',
  '1bc00996-b01a-0009-38c0-f03c4a000000',
  'x-ms-client-request-id',
  'f8592dd4-2c85-4758-9b66-dcd9b6cdc7c9',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:25.8788857Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:23.9077747Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:26 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946894089809349/sourcefile163946894284601578')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'a41741e0-e01a-0007-56c0-f0fda4000000',
  'x-ms-client-request-id',
  '27a77d53-178d-49e4-8ddd-28a7836ccafe',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Dec 2021 08:02:27 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946894089809349')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e37ef2-701a-0008-67c0-f0c247000000',
  'x-ms-client-request-id',
  'b93165fc-8249-41ab-b45a-df87d85b2145',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:28 GMT',
  'Connection',
  'close'
]);
