let nock = require('nock');

module.exports.hash = "4ef28efc30180ee9ff6ef6187702ebc9";

module.exports.testInfo = {"uniqueName":{"share":"share167875881564203206","dir":"dir167875881590404780"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881564203206')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:36 GMT',
  'ETag',
  '"0x8DB242EEC9FACB6"',
  'x-ms-request-id',
  '0b0de349-701a-0008-6617-56c247000000',
  'x-ms-client-request-id',
  '666f95a2-8944-4916-8192-a15ab63a864a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881564203206/dir167875881590404780.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:36 GMT',
  'ETag',
  '"0x8DB242EECC90AB9"',
  'x-ms-request-id',
  '0b0de34b-701a-0008-6717-56c247000000',
  'x-ms-client-request-id',
  'e1537526-0db2-4a92-9cc5-a89ff989f090',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:36.2751161Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:36.2751161Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:36.2751161Z',
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
  'Tue, 14 Mar 2023 01:53:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881564203206/dir167875881590404780.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:36 GMT',
  'ETag',
  '"0x8DB242EECF17B53"',
  'x-ms-request-id',
  '0b0de34c-701a-0008-6817-56c247000000',
  'x-ms-client-request-id',
  '1c2585eb-120c-449a-a12e-032bf1b703ff',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875881564203206/dir167875881590404780.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:36 GMT',
  'ETag',
  '"0x8DB242EECF17B53"',
  'x-ms-request-id',
  '0b0de34d-701a-0008-6917-56c247000000',
  'x-ms-client-request-id',
  '3bdc6ba1-f98f-4c10-9fee-47e38400c1c4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'false',
  'x-ms-file-change-time',
  '2023-03-14T01:53:36.5401427Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:36.2751161Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:36.2751161Z',
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
  'Tue, 14 Mar 2023 01:53:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875881564203206/dir167875881590404780.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:37 GMT',
  'ETag',
  '"0x8DB242EED4394B5"',
  'x-ms-request-id',
  '0b0de34f-701a-0008-6a17-56c247000000',
  'x-ms-client-request-id',
  '625d033e-444b-45d7-a067-afd50711688e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:53:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875881564203206/dir167875881590404780.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:37 GMT',
  'ETag',
  '"0x8DB242EED4394B5"',
  'x-ms-request-id',
  '0b0de350-701a-0008-6b17-56c247000000',
  'x-ms-client-request-id',
  '39b015bf-37ff-4895-b97b-eb9c90f48734',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key1',
  'Value1',
  'x-ms-file-change-time',
  '2023-03-14T01:53:37.0781877Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:36.2751161Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:36.2751161Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key1,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875881564203206')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de351-701a-0008-6c17-56c247000000',
  'x-ms-client-request-id',
  '92fc9437-38f6-4ad4-9f17-20f75623312a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:37 GMT'
]);
