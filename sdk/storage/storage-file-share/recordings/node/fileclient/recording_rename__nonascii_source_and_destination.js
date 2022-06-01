let nock = require('nock');

module.exports.hash = "0b39cba39d98b99d1130b1c9faa22162";

module.exports.testInfo = {"uniqueName":{"share":"share163946895630708095","dir":"dir163946895727608347","file":"file163946895800302175","汉字. dest ~!@#$%^&()_+`1234567890-={}[];','":"汉字. dest ~!@#$%^&()_+`1234567890-={}[];','163946895800403903","汉字. source ~!@#$%^&()_+`1234567890-={}[];','":"汉字. source ~!@#$%^&()_+`1234567890-={}[];','163946895800408329"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946895630708095')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:37 GMT',
  'ETag',
  '"0x8D9BED817EFAB85"',
  'x-ms-request-id',
  'a41741ef-e01a-0007-59c0-f0fda4000000',
  'x-ms-client-request-id',
  '66bb6d85-5e5d-43bd-aa7d-30d609c15f5f',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946895630708095/dir163946895727608347')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:38 GMT',
  'ETag',
  '"0x8D9BED8186008CD"',
  'x-ms-request-id',
  'a41741f2-e01a-0007-5ac0-f0fda4000000',
  'x-ms-client-request-id',
  '01eaf9b4-5eb5-4fd2-8204-2f4b205b1cf2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:38.0796109Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:38.0796109Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:38.0796109Z',
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
  'Tue, 14 Dec 2021 08:02:37 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946895630708095/%E6%B1%89%E5%AD%97.%20source%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163946895800408329')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:39 GMT',
  'ETag',
  '"0x8D9BED818F85389"',
  'x-ms-request-id',
  '61b4ef4a-e01a-0001-6fc0-f01b65000000',
  'x-ms-client-request-id',
  '096de4d2-1ad6-47b1-8481-ee7bd0692aee',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:39.0776713Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:39.0776713Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:39.0776713Z',
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
  'Tue, 14 Dec 2021 08:02:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share163946895630708095/%E6%B1%89%E5%AD%97.%20dest%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163946895800403903')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:39 GMT',
  'ETag',
  '"0x8D9BED81968CACD"',
  'x-ms-request-id',
  '61b4ef57-e01a-0001-70c0-f01b65000000',
  'x-ms-client-request-id',
  'a0c9dbae-305a-4fe2-b36d-ce78293ab272',
  'x-ms-version',
  '2021-04-10',
  'x-ms-file-change-time',
  '2021-12-14T08:02:39.8147277Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:39.0776713Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:39.0776713Z',
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
  'Tue, 14 Dec 2021 08:02:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946895630708095/%E6%B1%89%E5%AD%97.%20dest%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163946895800403903')
  .reply(200, "", [
  'Content-Length',
  '2048',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 14 Dec 2021 08:02:39 GMT',
  'ETag',
  '"0x8D9BED81968CACD"',
  'x-ms-request-id',
  '88abb41a-601a-0004-6cc0-f00ec4000000',
  'x-ms-client-request-id',
  '94664527-e654-41f5-be61-425afacc49df',
  'x-ms-version',
  '2021-04-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2021-12-14T08:02:39.8147277Z',
  'x-ms-file-last-write-time',
  '2021-12-14T08:02:39.0776713Z',
  'x-ms-file-creation-time',
  '2021-12-14T08:02:39.0776713Z',
  'x-ms-file-permission-key',
  '16394986450998199174*121971141114590432',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 14 Dec 2021 08:02:39 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share163946895630708095/%E6%B1%89%E5%AD%97.%20source%20~!%40%23%24%25%5E%26()_%2B%601234567890-%3D%7B%7D%5B%5D%3B%27%2C%27163946895800408329')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '55e37f09-701a-0008-72c0-f0c247000000',
  'x-ms-client-request-id',
  'b1bc4c5a-d131-46a8-bc01-2fd21c6fbee3',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 14 Dec 2021 08:02:40 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share163946895630708095')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '39e28cee-a01a-0003-16c0-f01608000000',
  'x-ms-client-request-id',
  '4353e871-d342-4364-b791-608d1412161b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 14 Dec 2021 08:02:41 GMT',
  'Connection',
  'close'
]);
