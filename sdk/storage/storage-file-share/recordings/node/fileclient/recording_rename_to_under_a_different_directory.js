let nock = require('nock');

module.exports.hash = "0500430200786faa9c8faf58fc2d5391";

module.exports.testInfo = {"uniqueName":{"share":"share163946944786208304","dir":"dir163946944812804287","file":"file163946944839503863","sourcedir":"sourcedir163946944839705994","sourcefile":"sourcefile163946944865009667","destdir":"destdir163946944891502061","destfile":"destfile163946944916405273"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944786208304')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:48 GMT',
  'ETag',
  '"0x8D9BED93C7F9B5E"',
  'x-ms-request-id',
  '55e38074-701a-0008-5fc2-f0c247000000',
  'x-ms-client-request-id',
  '4f7f2fd1-4fee-4488-8a71-8757b3bf9f6a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:10:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944786208304/dir163946944812804287')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:48 GMT',
  'ETag',
  '"0x8D9BED93CAAB3CB"',
  'x-ms-request-id',
  '55e38076-701a-0008-60c2-f0c247000000',
  'x-ms-client-request-id',
  '5c717e39-9f8f-4e6d-975b-e763e23b7592',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:48.4636619Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:48.4636619Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:48.4636619Z',
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
  'Tue, 14 Dec 2021 08:10:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944786208304/sourcedir163946944839705994')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:48 GMT',
  'ETag',
  '"0x8D9BED93CD19D3D"',
  'x-ms-request-id',
  '55e38077-701a-0008-61c2-f0c247000000',
  'x-ms-client-request-id',
  'bb3c1793-b674-45ab-8953-2174785df572',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:48.7186749Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:48.7186749Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:48.7186749Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:10:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944786208304/sourcedir163946944839705994/sourcefile163946944865009667')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:48 GMT',
  'ETag',
  '"0x8D9BED93CF94A2C"',
  'x-ms-request-id',
  '55e38078-701a-0008-62c2-f0c247000000',
  'x-ms-client-request-id',
  '0a33cb4f-3c6c-4d6a-bea0-4289bc112726',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:10:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944786208304/destdir163946944891502061')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:49 GMT',
  'ETag',
  '"0x8D9BED93D205AB1"',
  'x-ms-request-id',
  '55e38079-701a-0008-63c2-f0c247000000',
  'x-ms-client-request-id',
  '1095f712-aa88-4d19-b247-8a4c176f9110',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:49.2347057Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:49.2347057Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:49.2347057Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '10376363910205800448',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:10:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944786208304/destdir163946944891502061%2Fdestfile163946944916405273')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:49 GMT',
  'ETag',
  '"0x8D9BED93D463304"',
  'x-ms-request-id',
  '55e3807a-701a-0008-64c2-f0c247000000',
  'x-ms-client-request-id',
  '785b2880-4030-497c-861d-a9f6f6bf12a4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:49.4827268Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:10:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946944786208304/destdir163946944891502061%2Fdestfile163946944916405273')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:49 GMT',
  'ETag',
  '"0x8D9BED93D463304"',
  'x-ms-request-id',
  '55e3807b-701a-0008-65c2-f0c247000000',
  'x-ms-client-request-id',
  'da6e12cd-cd5e-479e-8adf-8a930fa10a38',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:10:49.4827268Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:48.9786924Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:10:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946944786208304/sourcedir163946944839705994/sourcefile163946944865009667')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e3807c-701a-0008-66c2-f0c247000000',
  'x-ms-client-request-id',
  '2a1d4f74-8e91-4f04-93fb-da77bb5f4660',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:10:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946944786208304')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e3807d-701a-0008-67c2-f0c247000000',
  'x-ms-client-request-id',
  '7e530c9b-9996-4e54-a78f-f03d8703632d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:10:49 GMT'
]);
