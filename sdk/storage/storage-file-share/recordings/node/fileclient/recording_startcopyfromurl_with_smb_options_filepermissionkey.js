let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share158116686824102397","dir":"dir158116686938604604","file":"file158116687042702001","copiedfile":"copiedfile158116687146103367"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158116686824102397')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 08 Feb 2020 13:01:09 GMT',
  'ETag',
  '"0x8D7AC96F76FBF71"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b094207-101a-000a-787f-de368c000000',
  'x-ms-client-request-id',
  '7f9184f7-a9d1-4784-8421-d3585312ab3e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sat, 08 Feb 2020 13:01:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158116686824102397/dir158116686938604604')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 08 Feb 2020 13:01:10 GMT',
  'ETag',
  '"0x8D7AC96F80F8B5C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75675aa4-101a-0047-557f-def960000000',
  'x-ms-client-request-id',
  '037cd8b4-3fe0-4aab-8dcd-1b103fa67d23',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-02-08T13:01:10.3054684Z',
  'x-ms-file-last-write-time',
  '2020-02-08T13:01:10.3054684Z',
  'x-ms-file-creation-time',
  '2020-02-08T13:01:10.3054684Z',
  'x-ms-file-permission-key',
  '6579762511900832825*3714103237668529072',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 08 Feb 2020 13:01:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158116686824102397/dir158116686938604604/file158116687042702001')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 08 Feb 2020 13:01:11 GMT',
  'ETag',
  '"0x8D7AC96F8AD2C61"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75675af9-101a-0047-287f-def960000000',
  'x-ms-client-request-id',
  '2e6421dd-7edf-4d6b-b301-ba063a05efcb',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-change-time',
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-last-write-time',
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-creation-time',
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-permission-key',
  '11181256410332760894*3714103237668529072',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sat, 08 Feb 2020 13:01:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158116686824102397', {"permission":"O:S-1-5-21-2127521184-1604012920-1887927527-21560751G:S-1-5-21-2127521184-1604012920-1887927527-513D:(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-397955417-626881126-188441444-3053964)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b094217-101a-000a-7b7f-de368c000000',
  'x-ms-client-request-id',
  '6624ebd7-0fda-4795-baf1-9b8482282274',
  'x-ms-version',
  '2019-07-07',
  'x-ms-file-permission-key',
  '8869853913668417717*3714103237668529072',
  'Date',
  'Sat, 08 Feb 2020 13:01:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158116686824102397/dir158116686938604604/copiedfile158116687146103367')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 08 Feb 2020 13:01:12 GMT',
  'ETag',
  '"0x8D7AC96F9842AE7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e23bbf7-501a-001b-237f-deac38000000',
  'x-ms-client-request-id',
  'd7343c71-9cae-4f35-876c-c738e0892fbf',
  'x-ms-version',
  '2019-07-07',
  'x-ms-copy-id',
  'f929306d-90f6-4201-b2b4-6a0da326708f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Sat, 08 Feb 2020 13:01:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share158116686824102397/dir158116686938604604/file158116687042702001')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sat, 08 Feb 2020 13:01:11 GMT',
  'ETag',
  '"0x8D7AC96F8AD2C61"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '75675b90-101a-0047-3a7f-def960000000',
  'x-ms-client-request-id',
  '8a89e2f4-2ec1-4356-80cb-afba1ab494d1',
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
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-last-write-time',
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-creation-time',
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-permission-key',
  '11181256410332760894*3714103237668529072',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Feb 2020 13:01:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share158116686824102397/dir158116686938604604/copiedfile158116687146103367')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sat, 08 Feb 2020 13:01:12 GMT',
  'ETag',
  '"0x8D7AC96F9842AE7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e23bbfb-501a-001b-247f-deac38000000',
  'x-ms-client-request-id',
  '016f013d-5323-4c92-8a5b-2b4ea69d8c2e',
  'x-ms-version',
  '2019-07-07',
  'x-ms-copy-id',
  'f929306d-90f6-4201-b2b4-6a0da326708f',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share158116686824102397/dir158116686938604604/file158116687042702001',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Sat, 08 Feb 2020 13:01:12 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-02-08T13:01:12.7474919Z',
  'x-ms-file-last-write-time',
  '2020-02-08T13:01:11.3385057Z',
  'x-ms-file-creation-time',
  '2011-10-05T14:48:00.0000000Z',
  'x-ms-file-permission-key',
  '15106964970904237829*3714103237668529072',
  'x-ms-file-attributes',
  'Hidden | System | Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Feb 2020 13:01:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158116686824102397')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1b09421a-101a-000a-7c7f-de368c000000',
  'x-ms-client-request-id',
  'f8be4353-f08b-4866-9941-3737cbfb36e0',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sat, 08 Feb 2020 13:01:12 GMT'
]);
