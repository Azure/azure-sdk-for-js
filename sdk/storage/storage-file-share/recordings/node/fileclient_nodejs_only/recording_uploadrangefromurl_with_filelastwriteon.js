let nock = require('nock');

module.exports.hash = "7b98c9484f3e4a67d3d9bf9349d8c31d";

module.exports.testInfo = {"uniqueName":{"share":"share164267027560008093","dir":"dir164267027584901244","file":"file164267027611304333","file2":"file2164267027661804101"},"newDate":{"now":"2022-01-20T09:17:56.616Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:55 GMT',
  'ETag',
  '"0x8D9DBF5BE87EAA7"',
  'x-ms-request-id',
  '41cd6f5c-701a-0008-1bde-0dc247000000',
  'x-ms-client-request-id',
  'd3edc928-ad97-4300-96b8-de7415cd5b02',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Thu, 20 Jan 2022 09:17:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093/dir164267027584901244')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:56 GMT',
  'ETag',
  '"0x8D9DBF5BEAF58AD"',
  'x-ms-request-id',
  '41cd6f5e-701a-0008-1cde-0dc247000000',
  'x-ms-client-request-id',
  '81e9d669-12f3-42c7-b6c2-196c87abfff3',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:56.2268845Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:56.2268845Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:56.2268845Z',
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
  'Thu, 20 Jan 2022 09:17:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093/dir164267027584901244/file164267027611304333')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:56 GMT',
  'ETag',
  '"0x8D9DBF5BED77A41"',
  'x-ms-request-id',
  '41cd6f5f-701a-0008-1dde-0dc247000000',
  'x-ms-client-request-id',
  '4d01d9c7-401c-4a9b-9e76-fb6181ea07d2',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:56.4898881Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:56.4898881Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:56.4898881Z',
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
  'Thu, 20 Jan 2022 09:17:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093/dir164267027584901244/file164267027611304333', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'M7JgimpVGenaItzrpXsK3g==',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:56 GMT',
  'ETag',
  '"0x8D9DBF5BEFDEE3F"',
  'x-ms-request-id',
  '41cd6f60-701a-0008-1ede-0dc247000000',
  'x-ms-client-request-id',
  '5122a8ad-ef73-4cfa-a708-496dbb11ac31',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:56.7418943Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093/dir164267027584901244/file2164267027661804101')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:56 GMT',
  'ETag',
  '"0x8D9DBF5BF2350E5"',
  'x-ms-request-id',
  '41cd6f61-701a-0008-1fde-0dc247000000',
  'x-ms-client-request-id',
  'f426545d-cc5b-476f-adf5-552237fbeb38',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-20T09:17:56.9869029Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:56.9869029Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:56.9869029Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093/dir164267027584901244/file2164267027661804101')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:57 GMT',
  'ETag',
  '"0x8D9DBF5BF50064F"',
  'x-ms-request-id',
  '41cd6f62-701a-0008-20de-0dc247000000',
  'x-ms-client-request-id',
  '29e2914a-65d0-498a-9f6a-d27c06125020',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:56.9869029Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164267027560008093/dir164267027584901244/file2164267027661804101')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:57 GMT',
  'ETag',
  '"0x8D9DBF5BF762C2F"',
  'x-ms-request-id',
  '41cd6f64-701a-0008-22de-0dc247000000',
  'x-ms-client-request-id',
  '065f2aec-86d9-4520-b62e-ba9203c2b5b5',
  'x-ms-version',
  '2021-06-08',
  'x-ms-content-crc64',
  'zGf3rvhKPeA=',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:57.5299119Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 20 Jan 2022 09:17:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164267027560008093/dir164267027584901244/file2164267027661804101')
  .reply(206, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-511/1024',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBF5BF762C2F"',
  'x-ms-request-id',
  '41cd6f66-701a-0008-24de-0dc247000000',
  'x-ms-client-request-id',
  '06226ead-c9ce-4364-9c3e-6707fc97a9cf',
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
  '2022-01-20T09:17:57.5299119Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:57.5299119Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:56.9869029Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Jan 2022 09:17:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164267027560008093/dir164267027584901244/file2164267027661804101')
  .reply(206, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", [
  'Content-Length',
  '512',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 512-1023/1024',
  'Last-Modified',
  'Thu, 20 Jan 2022 09:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9DBF5BF762C2F"',
  'x-ms-request-id',
  '41cd6f67-701a-0008-25de-0dc247000000',
  'x-ms-client-request-id',
  '7de9b11b-e779-4d3f-9d4d-443c9df346be',
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
  '2022-01-20T09:17:57.5299119Z',
  'x-ms-file-last-write-time',
  '2022-01-20T09:17:57.5299119Z',
  'x-ms-file-creation-time',
  '2022-01-20T09:17:56.9869029Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 20 Jan 2022 09:17:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164267027560008093')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '41cd6f68-701a-0008-26de-0dc247000000',
  'x-ms-client-request-id',
  'a248cba2-1499-470a-879f-4fa1794460aa',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Thu, 20 Jan 2022 09:17:57 GMT'
]);
