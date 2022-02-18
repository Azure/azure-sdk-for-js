let nock = require('nock');

module.exports.hash = "8c6405d86d36957a439daa060c6123f9";

module.exports.testInfo = {"uniqueName":{"share":"share163946896268405189","dir":"dir163946896365803497","file":"file163946896463400056","destfile":"destfile163946896463405933","sourcefile":"sourcefile163946896463404987"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896268405189')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:43 GMT',
  'ETag',
  '"0x8D9BED81BBDFA0D"',
  'x-ms-request-id',
  '55e37f0d-701a-0008-73c0-f0c247000000',
  'x-ms-client-request-id',
  '80cd17df-b4c2-457b-a8ad-3805013fe4b7',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:43 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896268405189/dir163946896365803497')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:44 GMT',
  'ETag',
  '"0x8D9BED81C540ED1"',
  'x-ms-request-id',
  '39e28cf0-a01a-0003-17c0-f01608000000',
  'x-ms-client-request-id',
  'bb112a2d-00fd-4af0-97bf-084aa88253dd',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:44.7120081Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:44.7120081Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:44.7120081Z',
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
  'Tue, 14 Dec 2021 08:02:44 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896268405189/sourcefile163946896463404987')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:45 GMT',
  'ETag',
  '"0x8D9BED81CE9C145"',
  'x-ms-request-id',
  'a4174201-e01a-0007-66c0-f0fda4000000',
  'x-ms-client-request-id',
  'fa10e2d5-3bb7-44bf-8aef-e132d60fc368',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:45.6930629Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:45.6930629Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:45.6930629Z',
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
  'Tue, 14 Dec 2021 08:02:44 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946896268405189/destfile163946896463405933')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:46 GMT',
  'ETag',
  '"0x8D9BED81D7F2592"',
  'x-ms-request-id',
  '61b4ef65-e01a-0001-7bc0-f01b65000000',
  'x-ms-client-request-id',
  '429914f5-3a91-4726-b96a-b2ebb6c4fbd4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:46.6721170Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:45.6930629Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:45.6930629Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:02:46 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946896268405189/destfile163946896463405933')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:46 GMT',
  'ETag',
  '"0x8D9BED81D7F2592"',
  'x-ms-request-id',
  'b9e7f0d1-201a-0006-50c0-f003a9000000',
  'x-ms-client-request-id',
  '4a830ecc-4c8b-4aed-bd3a-0364e83d7df6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:46.6721170Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:45.6930629Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:45.6930629Z',
  'x-ms-file-permission-key',
  '11994942563555057937*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:47 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946896268405189/sourcefile163946896463404987')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'f82c8a27-601a-0002-7ac0-f0e805000000',
  'x-ms-client-request-id',
  'd1b88b0c-307c-4167-94f1-454323046944',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Dec 2021 08:02:48 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946896268405189')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'bba569cd-201a-0000-2bc0-f0e568000000',
  'x-ms-client-request-id',
  'd43652a1-b2d6-4adf-a9fa-074982842e64',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:49 GMT',
  'Connection',
  'close'
]);
