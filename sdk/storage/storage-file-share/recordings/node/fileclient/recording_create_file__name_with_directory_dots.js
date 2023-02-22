let nock = require('nock');

module.exports.hash = "0109c5d5224a4efbc0a0e1d74b7d707d";

module.exports.testInfo = {"uniqueName":{"share":"share167703713462805481","dir":"dir167703713534705031","file":"file167703713549105291","filename":"filename167703713549505097"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713462805481')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:55 GMT',
  'ETag',
  '"0x8DB148653056892"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059b6-001a-0068-556f-46d31a000000',
  'x-ms-client-request-id',
  '1f45facc-865a-4ae4-9339-01feb73542cb',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713462805481/dir167703713534705031')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:55 GMT',
  'ETag',
  '"0x8DB1486531D06A3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059c2-001a-0068-5b6f-46d31a000000',
  'x-ms-client-request-id',
  'b50cc055-11a4-49d3-a59d-761e0a98dab7',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-22T03:38:55.5641507Z',
  'x-ms-file-last-write-time',
  '2023-02-22T03:38:55.5641507Z',
  'x-ms-file-creation-time',
  '2023-02-22T03:38:55.5641507Z',
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
  'Wed, 22 Feb 2023 03:38:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713462805481/dir167703713534705031/filename167703713549505097')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:55 GMT',
  'ETag',
  '"0x8DB14865332AE12"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059c7-001a-0068-5f6f-46d31a000000',
  'x-ms-client-request-id',
  'a33846e3-a374-4d3c-a5ad-62dc42ed5b1e',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-22T03:38:55.7060626Z',
  'x-ms-file-last-write-time',
  '2023-02-22T03:38:55.7060626Z',
  'x-ms-file-creation-time',
  '2023-02-22T03:38:55.7060626Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 22 Feb 2023 03:38:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167703713462805481/dir167703713534705031')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167703713462805481\" DirectoryPath=\"dir167703713534705031\"><Prefix>filename167703713549505097</Prefix><DirectoryId>13835128424026341376</DirectoryId><Entries><File><Name>filename167703713549505097</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>11</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059cc-001a-0068-646f-46d31a000000',
  'x-ms-client-request-id',
  '610c9ad0-173b-45be-b663-80e31731b649',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 03:38:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167703713462805481/dir167703713534705031/filename167703713549505097')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059ce-001a-0068-666f-46d31a000000',
  'x-ms-client-request-id',
  '55c0188c-a9f4-4d23-a219-061c1c6ccaac',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167703713462805481/filename167703713549505097')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 03:38:56 GMT',
  'ETag',
  '"0x8DB14865371CFE4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059d0-001a-0068-686f-46d31a000000',
  'x-ms-client-request-id',
  '28006697-4102-4cd6-9e19-f708eaf4a065',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-22T03:38:56.1198052Z',
  'x-ms-file-last-write-time',
  '2023-02-22T03:38:56.1198052Z',
  'x-ms-file-creation-time',
  '2023-02-22T03:38:56.1198052Z',
  'x-ms-file-permission-key',
  '13809038870468939698*1658283376881248060',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167703713462805481/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167703713462805481\" DirectoryPath=\"\"><Prefix>filename167703713549505097</Prefix><DirectoryId>0</DirectoryId><Entries><File><Name>filename167703713549505097</Name><FileId>16140971433240035328</FileId><Properties><Content-Length>11</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059d2-001a-0068-6a6f-46d31a000000',
  'x-ms-client-request-id',
  '2a4a28de-97dc-4f88-8bf0-a703cca8c237',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167703713462805481/filename167703713549505097')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059d3-001a-0068-6b6f-46d31a000000',
  'x-ms-client-request-id',
  '4d1d0da4-a22c-4cdb-a32b-2a2596d26cd9',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167703713462805481')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bc059d7-001a-0068-6f6f-46d31a000000',
  'x-ms-client-request-id',
  '38570563-cc8c-4c0d-9a34-0ad9209b5c31',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 03:38:55 GMT'
]);
