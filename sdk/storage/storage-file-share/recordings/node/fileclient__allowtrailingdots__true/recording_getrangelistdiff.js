let nock = require('nock');

module.exports.hash = "6f7d642981e338148930a5ad693e5f29";

module.exports.testInfo = {"uniqueName":{"share":"share167747748161904384","dir":"dir167747748187108005","file":"file167747748212703673"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:02 GMT',
  'ETag',
  '"0x8DB1887961BA118"',
  'x-ms-request-id',
  'e51cf743-601a-0004-2870-4a0ec4000000',
  'x-ms-client-request-id',
  'd9d4367d-2d87-4d8a-971f-c43828101a66',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384/dir167747748187108005....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:02 GMT',
  'ETag',
  '"0x8DB18879643CAAF"',
  'x-ms-request-id',
  'e51cf745-601a-0004-2970-4a0ec4000000',
  'x-ms-client-request-id',
  '23e17612-02bf-4da4-852d-203a74ce1b70',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:02.3733935Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:02.3733935Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:02.3733935Z',
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
  'Mon, 27 Feb 2023 05:58:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384/dir167747748187108005..../file167747748212703673....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:02 GMT',
  'ETag',
  '"0x8DB1887966ADAEF"',
  'x-ms-request-id',
  'e51cf746-601a-0004-2a70-4a0ec4000000',
  'x-ms-client-request-id',
  'b7d83274-db37-4c05-ad26-951b06d5639b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T05:58:02.6293999Z',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:02.6293999Z',
  'x-ms-file-creation-time',
  '2023-02-27T05:58:02.6293999Z',
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
  'Mon, 27 Feb 2023 05:58:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384/dir167747748187108005..../file167747748212703673....', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:02 GMT',
  'ETag',
  '"0x8DB18879692AE74"',
  'x-ms-request-id',
  'e51cf747-601a-0004-2b70-4a0ec4000000',
  'x-ms-client-request-id',
  'e9d5bebd-5102-47a9-b6b5-0d2c17eec92a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:02.8904052Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:02 GMT',
  'ETag',
  '"0x8DB1887961BA118"',
  'x-ms-request-id',
  'e51cf748-601a-0004-2c70-4a0ec4000000',
  'x-ms-client-request-id',
  'c38d9863-fce7-4cc6-8243-72a4ad2311b5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-snapshot',
  '2023-02-27T05:58:03.0000000Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384/dir167747748187108005..../file167747748212703673....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:03 GMT',
  'ETag',
  '"0x8DB188796E821EA"',
  'x-ms-request-id',
  'e51cf749-601a-0004-2d70-4a0ec4000000',
  'x-ms-client-request-id',
  '085c11c6-90fb-46c9-97f8-e6dffff1b638',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:03.4504170Z',
  'Date',
  'Mon, 27 Feb 2023 05:58:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167747748161904384/dir167747748187108005..../file167747748212703673....', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:03 GMT',
  'ETag',
  '"0x8DB1887970DF989"',
  'x-ms-request-id',
  'e51cf74a-601a-0004-2e70-4a0ec4000000',
  'x-ms-client-request-id',
  '94773eb6-287f-47af-9209-db643fa50556',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T05:58:03.6984201Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 05:58:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167747748161904384/dir167747748187108005..../file167747748212703673....')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><ClearRange><Start>0</Start><End>511</End></ClearRange><Range><Start>512</Start><End>1535</End></Range></Ranges>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 27 Feb 2023 05:58:03 GMT',
  'ETag',
  '"0x8DB1887970DF989"',
  'x-ms-request-id',
  'e51cf74b-601a-0004-2f70-4a0ec4000000',
  'x-ms-client-request-id',
  '0e651dcd-19d2-4e88-9a14-cfff0294191b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-content-length',
  '2049',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 05:58:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167747748161904384')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e51cf74d-601a-0004-3070-4a0ec4000000',
  'x-ms-client-request-id',
  '9b63c802-67f0-47e0-a93b-3680e0795a5c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 05:58:04 GMT'
]);
