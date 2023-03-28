let nock = require('nock');

module.exports.hash = "c456e2da12150342ff4bd21d104fe7c5";

module.exports.testInfo = {"uniqueName":{"share":"share167875882393401171","dir":"dir167875882419706445","dir1":"dir1167875882446509521"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882393401171')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:44 GMT',
  'ETag',
  '"0x8DB242EF191EFFF"',
  'x-ms-request-id',
  '0b0de36f-701a-0008-0517-56c247000000',
  'x-ms-client-request-id',
  '78664746-4f09-4d52-b5a3-565c30763f64',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882393401171/dir167875882419706445.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:44 GMT',
  'ETag',
  '"0x8DB242EF1BADCC3"',
  'x-ms-request-id',
  '0b0de371-701a-0008-0617-56c247000000',
  'x-ms-client-request-id',
  'f58c4bd2-e29c-4f5b-9de4-803d9418897d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:44.5707971Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:44.5707971Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:44.5707971Z',
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
  'Tue, 14 Mar 2023 01:53:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875882393401171/dir1167875882446509521...')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:44 GMT',
  'ETag',
  '"0x8DB242EF1E32655"',
  'x-ms-request-id',
  '0b0de372-701a-0008-0717-56c247000000',
  'x-ms-client-request-id',
  'b1c66aea-89a8-4562-932b-72f8ffc2b6c1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:44.8348245Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:44.8348245Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:44.8348245Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882393401171/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167875882393401171\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><Directory><Name>dir1167875882446509521</Name><FileId>11529285414812647424</FileId><Properties /></Directory><Directory><Name>dir167875882419706445</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de373-701a-0008-0817-56c247000000',
  'x-ms-client-request-id',
  '4bb31373-0a66-4aef-b0ef-60352132789b',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882393401171/dir1167875882446509521...')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de374-701a-0008-0917-56c247000000',
  'x-ms-client-request-id',
  '05fbc870-7b90-4e90-9c4d-d8f8ae754117',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875882393401171/dir1167875882446509521...')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:0b0de375-701a-0008-0a17-56c247000000\nTime:2023-03-14T01:53:45.5906843Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de375-701a-0008-0a17-56c247000000',
  'x-ms-client-request-id',
  'e7fb8615-7381-413c-bb38-3c29da8884d5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:44 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875882393401171')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de37f-701a-0008-0b17-56c247000000',
  'x-ms-client-request-id',
  '8d88ca6c-654d-4d66-958a-3753d93c974e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:45 GMT'
]);
