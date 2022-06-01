let nock = require('nock');

module.exports.hash = "0d70b028cbf4ef70b14c5b3d969f77e4";

module.exports.testInfo = {"uniqueName":{"share":"share163946944461707256","dir":"dir163946944624308677","file":"file163946944654007796","destfile":"destfile163946944682001887"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944461707256')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:46 GMT',
  'ETag',
  '"0x8D9BED93B5BDAB6"',
  'x-ms-request-id',
  '55e3806a-701a-0008-58c2-f0c247000000',
  'x-ms-client-request-id',
  'fca366eb-a3c3-41cf-af24-22b178aa5ccb',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:10:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944461707256/dir163946944624308677')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:46 GMT',
  'ETag',
  '"0x8D9BED93B8F545B"',
  'x-ms-request-id',
  '55e3806d-701a-0008-59c2-f0c247000000',
  'x-ms-client-request-id',
  'b48b098b-2fda-45d9-af61-a45754c8888f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:46.6065499Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:46.6065499Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:46.6065499Z',
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
  'Tue, 14 Dec 2021 08:10:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944461707256/dir163946944624308677/file163946944654007796')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:46 GMT',
  'ETag',
  '"0x8D9BED93BB812B6"',
  'x-ms-request-id',
  '55e3806f-701a-0008-5ac2-f0c247000000',
  'x-ms-client-request-id',
  'a6288920-0255-4df1-a7be-f8dceda3250b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:10:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946944461707256/destfile163946944682001887')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:47 GMT',
  'ETag',
  '"0x8D9BED93BE16D77"',
  'x-ms-request-id',
  '55e38070-701a-0008-5bc2-f0c247000000',
  'x-ms-client-request-id',
  'ef5b184e-aaf8-4dc9-ac6f-138c9337e328',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:10:47.1445879Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:10:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946944461707256/destfile163946944682001887')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:10:47 GMT',
  'ETag',
  '"0x8D9BED93BE16D77"',
  'x-ms-request-id',
  '55e38071-701a-0008-5cc2-f0c247000000',
  'x-ms-client-request-id',
  'ccf7ed34-67c2-4c4b-aaed-04890283dc68',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:10:47.1445879Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:10:46.8735670Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:10:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946944461707256/dir163946944624308677/file163946944654007796')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e38072-701a-0008-5dc2-f0c247000000',
  'x-ms-client-request-id',
  '4978d55a-4285-4bf3-b90c-f8c7408dce6f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:10:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946944461707256')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e38073-701a-0008-5ec2-f0c247000000',
  'x-ms-client-request-id',
  '400c6aa2-e86f-43a5-82b4-82c20de6b165',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:10:47 GMT'
]);
