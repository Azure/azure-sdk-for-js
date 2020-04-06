let nock = require('nock');

module.exports.hash = "17fd3fa89da89d22bb8d9173f969e0f3";

module.exports.testInfo = {"uniqueName":{"share":"share158508697009707283","dir":"dir158508697135305464","file":"file158508697164002099"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158508697009707283')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:56:10 GMT',
  'ETag',
  '"0x8D7D03E2A1423DE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17e9-a01a-00ec-0427-027be2000000',
  'x-ms-client-request-id',
  '26271d04-c903-4e4f-8cab-98c7e9451714',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 24 Mar 2020 21:56:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158508697009707283/dir158508697135305464')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:56:11 GMT',
  'ETag',
  '"0x8D7D03E2A4604FC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17ec-a01a-00ec-0527-027be2000000',
  'x-ms-client-request-id',
  'c8913f14-ed47-4f5c-b0b8-621bec41b01c',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-03-24T21:56:11.1996156Z',
  'x-ms-file-last-write-time',
  '2020-03-24T21:56:11.1996156Z',
  'x-ms-file-creation-time',
  '2020-03-24T21:56:11.1996156Z',
  'x-ms-file-permission-key',
  '4124527601788187190*5901512198059681215',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Mar 2020 21:56:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158508697009707283/dir158508697135305464/file158508697164002099')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:56:11 GMT',
  'ETag',
  '"0x8D7D03E2A718C62"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17ee-a01a-00ec-0627-027be2000000',
  'x-ms-client-request-id',
  'a24960a0-3b2d-4770-b533-14a9db5d4ed3',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-last-write-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-creation-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-permission-key',
  '17962196248988912945*5901512198059681215',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Mar 2020 21:56:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158508697009707283/dir158508697135305464/file158508697164002099', "789ccb48cdc9c95728cf2fca495148ca4fa954282e29cacc4b57040072de0903")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'BYN1kjvCGsjiR9sU4v87xg==',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:56:11 GMT',
  'ETag',
  '"0x8D7D03E2A81479F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17ef-a01a-00ec-0727-027be2000000',
  'x-ms-client-request-id',
  '182a2888-fea1-4eb2-9fa7-e8102c893c0b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Mar 2020 21:56:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share158508697009707283/dir158508697135305464/file158508697164002099')
  .reply(200, [], [
  'Content-Length',
  '32',
  'Content-Type',
  'text/plain',
  'Content-Encoding',
  'deflate',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:56:11 GMT',
  'ETag',
  '"0x8D7D03E2A81479F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17f1-a01a-00ec-0827-027be2000000',
  'x-ms-client-request-id',
  '91ea62b7-7664-436d-a948-163088afb94b',
  'x-ms-version',
  '2019-07-07',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-last-write-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-creation-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-permission-key',
  '17962196248988912945*5901512198059681215',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 21:56:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share158508697009707283/dir158508697135305464/file158508697164002099')
  .reply(206, ["789ccb48cdc9c95728cf2fca495148ca4fa954282e29cacc4b57040072de0903"], [
  'Content-Length',
  '32',
  'Content-Type',
  'text/plain',
  'Content-Encoding',
  'deflate',
  'Content-Range',
  'bytes 0-31/32',
  'Last-Modified',
  'Tue, 24 Mar 2020 21:56:11 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D03E2A81479F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17f2-a01a-00ec-0927-027be2000000',
  'x-ms-client-request-id',
  '053d0cdf-41cd-4745-94b9-a4e3c7ec0780',
  'x-ms-version',
  '2019-07-07',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-last-write-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-creation-time',
  '2020-03-24T21:56:11.4848866Z',
  'x-ms-file-permission-key',
  '17962196248988912945*5901512198059681215',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 24 Mar 2020 21:56:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158508697009707283')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '442d17f4-a01a-00ec-0a27-027be2000000',
  'x-ms-client-request-id',
  'a9da0038-322a-4e36-b86b-fda639141548',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 24 Mar 2020 21:56:12 GMT'
]);
