let nock = require('nock');

module.exports.hash = "1b292f2724fe7a5e1892b5e05ae360c4";

module.exports.testInfo = {"uniqueName":{"share":"share164267027300001002","dir":"dir164267027324900830","file":"file164267027350503080"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:53 GMT',
  'ETag',
  '"0x8D9DBF5BCFB2EB3"',
  'x-ms-request-id',
  '41cd6f50-701a-0008-11de-0dc247000000',
  'x-ms-client-request-id',
  'c88d6d3d-586c-4d9c-8822-49bbbf773eeb',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Thu, 20 Jan 2022 09:17:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002/dir164267027324900830')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:53 GMT',
  'ETag',
  '"0x8D9DBF5BD229C25"',
  'x-ms-request-id',
  '41cd6f52-701a-0008-12de-0dc247000000',
  'x-ms-client-request-id',
  '0c6a2ee5-df3d-4006-9a17-dc9b805951f7',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:53.6268325Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:53.6268325Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:53.6268325Z',
  'x-ms-file-permission-key',
  '12098348342869812368*3117928199373521617',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002/dir164267027324900830/file164267027350503080')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:53 GMT',
  'ETag',
  '"0x8D9DBF5BD49376A"',
  'x-ms-request-id',
  '41cd6f53-701a-0008-13de-0dc247000000',
  'x-ms-client-request-id',
  'c5a19eb1-cbad-4d33-a57b-4c6aa4b6905d',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:53.8798442Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:53.8798442Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:53.8798442Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002/dir164267027324900830/file164267027350503080', "Hello")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:54 GMT',
  'ETag',
  '"0x8D9DBF5BD6FF964"',
  'x-ms-request-id',
  '41cd6f54-701a-0008-14de-0dc247000000',
  'x-ms-client-request-id',
  '7568fc30-b76f-43aa-a988-e79ae3ed68af',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:54.1338468Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002/dir164267027324900830/file164267027350503080', "World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:54 GMT',
  'ETag',
  '"0x8D9DBF5BD966D51"',
  'x-ms-request-id',
  '41cd6f56-701a-0008-15de-0dc247000000',
  'x-ms-client-request-id',
  '064d35f2-1b4d-43c1-bd29-15b5389aa405',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:54.3858513Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002/dir164267027324900830/file164267027350503080')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:54 GMT',
  'ETag',
  '"0x8D9DBF5BDBC44E2"',
  'x-ms-request-id',
  '41cd6f57-701a-0008-16de-0dc247000000',
  'x-ms-client-request-id',
  '080af4aa-e321-4bcf-9cf5-22b1e079f940',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:54.3858513Z',
  'Date',
  'Thu, 20 Jan 2022 09:17:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164267027300001002/dir164267027324900830/file164267027350503080')
  .reply(200, "H\u0000\u0000\u0000\u0000World", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBF5BDBC44E2"',
  'x-ms-request-id',
  '41cd6f58-701a-0008-17de-0dc247000000',
  'x-ms-client-request-id',
  '145b5cfa-7760-4b26-8467-5632a5940ec6',
  'x-ms-version',
  '2021-06-08',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-01-20T09:17:54.6338530Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:54.3858513Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:53.8798442Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Jan 2022 09:17:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027300001002/dir164267027324900830/file164267027350503080')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:55 GMT',
  'ETag',
  '"0x8D9DBF5BE08B794"',
  'x-ms-request-id',
  '41cd6f59-701a-0008-18de-0dc247000000',
  'x-ms-client-request-id',
  'ebe0cdd3-888c-44cc-9e31-4ccf890d8df7',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:55.1348628Z',
  'Date',
  'Thu, 20 Jan 2022 09:17:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164267027300001002/dir164267027324900830/file164267027350503080')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBF5BE08B794"',
  'x-ms-request-id',
  '41cd6f5a-701a-0008-19de-0dc247000000',
  'x-ms-client-request-id',
  '94a22ce9-bba9-43ef-9bdc-eae0b41f19b0',
  'x-ms-version',
  '2021-06-08',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-01-20T09:17:55.1348628Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:55.1348628Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:53.8798442Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Jan 2022 09:17:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164267027300001002')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '41cd6f5b-701a-0008-1ade-0dc247000000',
  'x-ms-client-request-id',
  '9b9037ae-a295-4387-a9f2-0e7aedd29de3',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Thu, 20 Jan 2022 09:17:55 GMT'
]);
