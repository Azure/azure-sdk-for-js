let nock = require('nock');

module.exports.hash = "9a889c579accd33d98ebf28fcaf81123";

module.exports.testInfo = {"uniqueName":{"share":"share164033588294808130","dir":"dir164033588402703610","file":"file164033588429408750","sourcefile":"sourcefile164033588429807501","destfile":"destfile164033588481105910"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588294808130')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:24 GMT',
  'ETag',
  '"0x8D9C6BA909B2E41"',
  'x-ms-request-id',
  '21686ded-201a-0006-54a3-f803a9000000',
  'x-ms-client-request-id',
  'c8f26558-c6df-4e2d-a0b0-4a4690b96ebb',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:51:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588294808130/dir164033588402703610')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:24 GMT',
  'ETag',
  '"0x8D9C6BA90C7F3A6"',
  'x-ms-request-id',
  '21686df0-201a-0006-55a3-f803a9000000',
  'x-ms-client-request-id',
  '71b8a11a-90ac-4b4b-bd57-aadb39bc0bba',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:51:24.4875686Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:24.4875686Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:24.4875686Z',
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
  'Fri, 24 Dec 2021 08:51:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588294808130/sourcefile164033588429807501')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:24 GMT',
  'ETag',
  '"0x8D9C6BA90F0B1CA"',
  'x-ms-request-id',
  '21686df2-201a-0006-56a3-f803a9000000',
  'x-ms-client-request-id',
  '36c2481c-fd09-4896-b343-0fc5dbae3f26',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:51:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588294808130/sourcefile164033588429807501')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:24 GMT',
  'ETag',
  '"0x8D9C6BA90F0B1CA"',
  'x-ms-request-id',
  '21686df3-201a-0006-57a3-f803a9000000',
  'x-ms-client-request-id',
  'e3db674d-8824-41c9-bc97-4502619e61d3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-lease-id',
  'd7a5839b-bdc7-4f20-aa53-528ad12443ca',
  'Date',
  'Fri, 24 Dec 2021 08:51:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164033588294808130/destfile164033588481105910')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:25 GMT',
  'ETag',
  '"0x8D9C6BA913DC196"',
  'x-ms-request-id',
  '21686df4-201a-0006-58a3-f803a9000000',
  'x-ms-client-request-id',
  '99ddd7ad-d0b0-42cf-a74f-0c6033537371',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-24T08:51:25.2596118Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 24 Dec 2021 08:51:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033588294808130/destfile164033588481105910')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 24 Dec 2021 08:51:25 GMT',
  'ETag',
  '"0x8D9C6BA913DC196"',
  'x-ms-request-id',
  '21686df5-201a-0006-59a3-f803a9000000',
  'x-ms-client-request-id',
  '918db60f-3363-4ef4-9504-733805f50be6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-file-change-time',
  '2021-12-24T08:51:25.2596118Z',
  'x-ms-file-last-write-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-creation-time',
  '2021-12-24T08:51:24.7545802Z',
  'x-ms-file-permission-key',
  '14515944266653103543*3117928199373521617',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:51:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share164033588294808130/sourcefile164033588429807501')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '21686dff-201a-0006-5aa3-f803a9000000',
  'x-ms-client-request-id',
  '4bd974d4-03d8-4db5-a30d-7ebaa87e2331',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 Dec 2021 08:51:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164033588294808130')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '21686e01-201a-0006-5ba3-f803a9000000',
  'x-ms-client-request-id',
  'dd34e0f9-41b4-45f0-87e8-556380618b30',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Fri, 24 Dec 2021 08:51:25 GMT'
]);
