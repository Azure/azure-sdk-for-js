let nock = require('nock');

module.exports.hash = "1663c2df5ebd1cdca8b3c8eef32dfe82";

module.exports.testInfo = {"uniqueName":{"share":"share159972991476308408","dir":"dir159972991651208876","file":"file159972991679300560"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159972991476308408')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 10 Sep 2020 09:25:15 GMT',
  'ETag',
  '"0x8D8556B6D5014FF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd5e-a01a-0001-2054-87e0b4000000',
  'x-ms-client-request-id',
  '05fa39fe-0acf-4841-9cc8-c557c6786ed6',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 10 Sep 2020 09:25:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159972991476308408/dir159972991651208876')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 10 Sep 2020 09:25:15 GMT',
  'ETag',
  '"0x8D8556B6D7D637E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd6a-a01a-0001-2154-87e0b4000000',
  'x-ms-client-request-id',
  '447a62b0-7321-4513-ab00-03a4f708c759',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-10T09:25:15.9720830Z',
  'x-ms-file-last-write-time',
  '2020-09-10T09:25:15.9720830Z',
  'x-ms-file-creation-time',
  '2020-09-10T09:25:15.9720830Z',
  'x-ms-file-permission-key',
  '14827816195503570342*11897905858180131375',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 10 Sep 2020 09:25:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159972991476308408/dir159972991651208876/file159972991679300560')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 10 Sep 2020 09:25:16 GMT',
  'ETag',
  '"0x8D8556B6DA84BBF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd6b-a01a-0001-2254-87e0b4000000',
  'x-ms-client-request-id',
  '27d42776-a2b7-49f5-8b97-7520bda4da97',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-10T09:25:16.2532799Z',
  'x-ms-file-last-write-time',
  '2020-09-10T09:25:16.2532799Z',
  'x-ms-file-creation-time',
  '2020-09-10T09:25:16.2532799Z',
  'x-ms-file-permission-key',
  '990002565778260641*11897905858180131375',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 10 Sep 2020 09:25:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159972991476308408/dir159972991651208876/file159972991679300560')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 10 Sep 2020 09:25:16 GMT',
  'ETag',
  '"0x8D8556B6DD1FB3E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd6d-a01a-0001-2354-87e0b4000000',
  'x-ms-client-request-id',
  '32c7a85d-8d2e-43a3-aa93-b76e0fa73f8b',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-09-10T09:25:16.5264702Z',
  'x-ms-file-last-write-time',
  '2020-09-10T09:25:16.5264702Z',
  'x-ms-file-creation-time',
  '2020-09-10T09:25:16.2532799Z',
  'x-ms-file-permission-key',
  '990002565778260641*11897905858180131375',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 10 Sep 2020 09:25:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share159972991476308408/dir159972991651208876/file159972991679300560')
  .reply(200, "", [
  'Content-Length',
  '4398046511104',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 10 Sep 2020 09:25:16 GMT',
  'ETag',
  '"0x8D8556B6DD1FB3E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd6e-a01a-0001-2454-87e0b4000000',
  'x-ms-client-request-id',
  'b0466f3a-36ad-4da5-8816-81de1f6d8cd3',
  'x-ms-version',
  '2020-02-10',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2020-09-10T09:25:16.5264702Z',
  'x-ms-file-last-write-time',
  '2020-09-10T09:25:16.5264702Z',
  'x-ms-file-creation-time',
  '2020-09-10T09:25:16.2532799Z',
  'x-ms-file-permission-key',
  '990002565778260641*11897905858180131375',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 10 Sep 2020 09:25:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share159972991476308408/dir159972991651208876/file159972991679300560', "Hello World")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 10 Sep 2020 09:25:17 GMT',
  'ETag',
  '"0x8D8556B6E255A4A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd6f-a01a-0001-2554-87e0b4000000',
  'x-ms-client-request-id',
  '5659561a-d347-459c-80a9-d4717f4e3018',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 10 Sep 2020 09:25:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share159972991476308408')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '233acd71-a01a-0001-2654-87e0b4000000',
  'x-ms-client-request-id',
  '8931bfa0-f051-4a61-a269-2c556fa6adf1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 10 Sep 2020 09:25:16 GMT'
]);
