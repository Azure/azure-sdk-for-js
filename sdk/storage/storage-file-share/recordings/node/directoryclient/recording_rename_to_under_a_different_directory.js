let nock = require('nock');

module.exports.hash = "c54a1daa9b2a9a5f18095017ceb1c1ac";

module.exports.testInfo = {"uniqueName":{"share":"share163947022863400016","dir":"dir163947022889009923","sourceParentdir":"sourceParentdir163947022915806237","sourcedir":"sourcedir163947022940904042","destParentdir":"destParentdir163947022966709893","destdir":"destdir163947022991803285"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022863400016')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:48 GMT',
  'ETag',
  '"0x8D9BEDB0DE04253"',
  'x-ms-request-id',
  '88abb7c7-601a-0004-04c3-f00ec4000000',
  'x-ms-client-request-id',
  '4417a87b-befc-43b7-9838-b925211f1aea',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022863400016/dir163947022889009923')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:49 GMT',
  'ETag',
  '"0x8D9BEDB0E08A6EB"',
  'x-ms-request-id',
  '88abb7c9-601a-0004-05c3-f00ec4000000',
  'x-ms-client-request-id',
  'f3361680-3847-46c6-9dc1-8f78d460b94b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:49.2199147Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:49.2199147Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:49.2199147Z',
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
  'Tue, 14 Dec 2021 08:23:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022863400016/sourceParentdir163947022915806237')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:49 GMT',
  'ETag',
  '"0x8D9BEDB0E307AF5"',
  'x-ms-request-id',
  '88abb7ca-601a-0004-06c3-f00ec4000000',
  'x-ms-client-request-id',
  '229d54dd-9c63-48c0-abf3-dba743e26618',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:49.4809333Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:49.4809333Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:49.4809333Z',
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
  'Tue, 14 Dec 2021 08:23:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022863400016/sourceParentdir163947022915806237/sourcedir163947022940904042')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:49 GMT',
  'ETag',
  '"0x8D9BEDB0E57D9A7"',
  'x-ms-request-id',
  '88abb7cb-601a-0004-07c3-f00ec4000000',
  'x-ms-client-request-id',
  'b789d95d-ee5a-46df-8a99-f0bac23fb681',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022863400016/destParentdir163947022966709893')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:49 GMT',
  'ETag',
  '"0x8D9BEDB0E7E26EC"',
  'x-ms-request-id',
  '88abb7cc-601a-0004-08c3-f00ec4000000',
  'x-ms-client-request-id',
  'a7c78ce9-fad1-4f28-86ca-e3757734031d',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:49.9899628Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:49.9899628Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:49.9899628Z',
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
  'Tue, 14 Dec 2021 08:23:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163947022863400016/destParentdir163947022966709893%2Fdestdir163947022991803285')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:50 GMT',
  'ETag',
  '"0x8D9BEDB0EA44D10"',
  'x-ms-request-id',
  '88abb7cd-601a-0004-09c3-f00ec4000000',
  'x-ms-client-request-id',
  '71c8d45d-14d0-4dcf-902d-67866107ca72',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:23:50.2399760Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Dec 2021 08:23:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947022863400016/destParentdir163947022966709893%2Fdestdir163947022991803285')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:23:50 GMT',
  'ETag',
  '"0x8D9BEDB0EA44D10"',
  'x-ms-request-id',
  '88abb7ce-601a-0004-0ac3-f00ec4000000',
  'x-ms-client-request-id',
  'a5230ebe-f6be-49c1-ae05-0080baf6a016',
  'x-ms-version',
  '2021-04-10',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:23:50.2399760Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:23:49.7389479Z',
  'x-ms-file-permission-key',
  '10165108698639110817*121971141114590432',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '10376363910205800448',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share163947022863400016/sourceParentdir163947022915806237/sourcedir163947022940904042')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:88abb7d0-601a-0004-0cc3-f00ec4000000\nTime:2021-12-14T08:23:50.7323143Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '88abb7d0-601a-0004-0cc3-f00ec4000000',
  'x-ms-client-request-id',
  '96be7285-d5bd-49f7-9564-f846b249e0f2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Dec 2021 08:23:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163947022863400016')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '88abb7d1-601a-0004-0dc3-f00ec4000000',
  'x-ms-client-request-id',
  'c02f8e89-1542-49ce-9f3e-00867ee76064',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:23:50 GMT'
]);
