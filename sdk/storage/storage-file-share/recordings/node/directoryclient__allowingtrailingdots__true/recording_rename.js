let nock = require('nock');

module.exports.hash = "900db46343232d667719783768179ed1";

module.exports.testInfo = {"uniqueName":{"share":"share167875882100502471","dir":"dir167875882126601366","destdir":"destdir167875882155405324","destdir1":"destdir1167875882264105023"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882100502471')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:41 GMT',
  'ETag',
  '"0x8DB242EEFD20FA1"',
  'x-ms-request-id',
  '0b0de363-701a-0008-7a17-56c247000000',
  'x-ms-client-request-id',
  'edb48578-039b-4e0e-9d4b-acce0cdd7458',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882100502471/dir167875882126601366.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:41 GMT',
  'ETag',
  '"0x8DB242EEFFE2F55"',
  'x-ms-request-id',
  '0b0de365-701a-0008-7b17-56c247000000',
  'x-ms-client-request-id',
  '59f3f91e-0db7-41b8-bb5b-00eed9c3d496',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882100502471/destdir167875882155405324....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:41 GMT',
  'ETag',
  '"0x8DB242EF03015FF"',
  'x-ms-request-id',
  '0b0de366-701a-0008-7c17-56c247000000',
  'x-ms-client-request-id',
  'd1195bbd-6f6b-43ec-a97e-f3794906082e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:41.9835903Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882100502471/destdir167875882155405324....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:41 GMT',
  'ETag',
  '"0x8DB242EF03015FF"',
  'x-ms-request-id',
  '0b0de367-701a-0008-7d17-56c247000000',
  'x-ms-client-request-id',
  'd6439e15-acf7-4c81-ad23-8fe72b36bc51',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:41.9835903Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882100502471/dir167875882126601366.')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:0b0de368-701a-0008-7e17-56c247000000\nTime:2023-03-14T01:53:42.5124650Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de368-701a-0008-7e17-56c247000000',
  'x-ms-client-request-id',
  '7d34fdad-5be9-427f-b287-2f6fc2b6bf9b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:41 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882100502471/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875882100502471\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>destdir167875882155405324....</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de369-701a-0008-7f17-56c247000000',
  'x-ms-client-request-id',
  '9c0d683d-5824-4916-a198-a7f6a56680ec',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882100502471/destdir1167875882264105023....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:42 GMT',
  'ETag',
  '"0x8DB242EF0CB20FC"',
  'x-ms-request-id',
  '0b0de36a-701a-0008-8017-56c247000000',
  'x-ms-client-request-id',
  '15855129-531b-49de-be99-a3e6c89190c9',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:42.9996796Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882100502471/destdir1167875882264105023....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:42 GMT',
  'ETag',
  '"0x8DB242EF0CB20FC"',
  'x-ms-request-id',
  '0b0de36b-701a-0008-0117-56c247000000',
  'x-ms-client-request-id',
  'ccd581c4-6a08-4598-808b-b4a103fbd798',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-03-14T01:53:42.9996796Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:41.6565589Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882100502471/destdir167875882155405324....')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:0b0de36c-701a-0008-0217-56c247000000\nTime:2023-03-14T01:53:43.5145377Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de36c-701a-0008-0217-56c247000000',
  'x-ms-client-request-id',
  '3c56f10d-6800-402f-9d99-eeca4d15549f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882100502471/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875882100502471\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>destdir1167875882264105023....</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de36d-701a-0008-0317-56c247000000',
  'x-ms-client-request-id',
  '8cb0bcda-b724-4e6e-a416-838ccc5e48b3',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882100502471')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de36e-701a-0008-0417-56c247000000',
  'x-ms-client-request-id',
  'dd498dcd-4b35-44bc-93db-afc51cae6346',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:43 GMT'
]);
