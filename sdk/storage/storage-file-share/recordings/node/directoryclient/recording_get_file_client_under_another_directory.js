let nock = require('nock');

module.exports.hash = "3d5088c6da6fceb4bbb76ca500b62216";

module.exports.testInfo = {"uniqueName":{"share":"share166564473251300329","dir":"dir166564473263101581","subdir":"subdir166564473274609900","file":"file166564473274600302"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473251300329')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951CBADFD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d8887-001a-0086-23d2-ded999000000',
  'x-ms-client-request-id',
  '741b7e0d-07c7-4987-8e08-51b7928c3bbf',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 13 Oct 2022 07:05:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473251300329/dir166564473263101581')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951DDA733"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d8889-001a-0086-24d2-ded999000000',
  'x-ms-client-request-id',
  '966ac2ae-b05c-4afa-8358-6e46cba701ea',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.7184691Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.7184691Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.7184691Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 07:05:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473251300329/dir166564473263101581/subdir166564473274609900')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951EEBBE3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d888b-001a-0086-26d2-ded999000000',
  'x-ms-client-request-id',
  '16412500-99b4-41b4-baf9-bd568620bdb0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.8304099Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.8304099Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.8304099Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 07:05:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share166564473251300329/dir166564473263101581/subdir166564473274609900/file166564473274600302')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951FF0D61"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d888c-001a-0086-27d2-ded999000000',
  'x-ms-client-request-id',
  '5d7f9bc0-fdb4-4ea1-997a-db4b6ffaa331',
  'x-ms-version',
  '2021-08-06',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Oct 2022 07:05:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share166564473251300329/dir166564473263101581/subdir166564473274609900/file166564473274600302')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951FF0D61"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d888d-001a-0086-28d2-ded999000000',
  'x-ms-client-request-id',
  'dd632523-6691-4207-851f-108fd15e33a9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Oct 2022 07:05:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share166564473251300329/dir166564473263101581/subdir166564473274609900/file166564473274600302')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 13 Oct 2022 07:05:32 GMT',
  'ETag',
  '"0x8DAACE951FF0D61"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d888e-001a-0086-29d2-ded999000000',
  'x-ms-client-request-id',
  'b9298da9-d326-4a66-8d44-a0a7d7ab8e33',
  'x-ms-version',
  '2021-08-06',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-last-write-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-creation-time',
  '2022-10-13T07:05:32.9373537Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Oct 2022 07:05:32 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share166564473251300329')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '920d888f-001a-0086-2ad2-ded999000000',
  'x-ms-client-request-id',
  '8fb3a19c-1e3c-4a0e-9cbb-21c412438e1a',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 13 Oct 2022 07:05:32 GMT'
]);
