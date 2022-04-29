let nock = require('nock');

module.exports.hash = "2e1e75c84fb51e107ec6c4e025207318";

module.exports.testInfo = {"uniqueName":{"share":"share164249311170306821","dir":"dir164249311195803405"},"newDate":{"now":"2022-01-18T08:05:12.477Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311170306821')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:12 GMT',
  'ETag',
  '"0x8D9DA5940AA719E"',
  'x-ms-request-id',
  'fe550b63-201a-0006-2c42-0c03a9000000',
  'x-ms-client-request-id',
  '1057291a-6487-4280-aa74-ada636fe04c4',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 08:05:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311170306821/dir164249311195803405')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:12 GMT',
  'ETag',
  '"0x8D9DA5940D30730"',
  'x-ms-request-id',
  'fe550b65-201a-0006-2d42-0c03a9000000',
  'x-ms-client-request-id',
  'fa2fdc04-327a-4ad1-97a7-563203e3dcbc',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T08:05:12.4152112Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:12.4152112Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:12.4152112Z',
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
  'Tue, 18 Jan 2022 08:05:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164249311170306821')
  .query(true)
  .reply(200, {"permission":"O:BAG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;BA)(A;OICIIO;GA;;;CO)"}, [
  'Content-Length',
  '149',
  'x-ms-request-id',
  'fe550b66-201a-0006-2e42-0c03a9000000',
  'x-ms-client-request-id',
  '6b98bbe9-8f91-4dbf-9663-3417da77058f',
  'x-ms-version',
  '2021-06-08',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 08:05:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share164249311170306821/dir164249311195803405')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:12 GMT',
  'ETag',
  '"0x8D9DA594123BFC5"',
  'x-ms-request-id',
  'fe550b67-201a-0006-2f42-0c03a9000000',
  'x-ms-client-request-id',
  '249a54b2-2e53-4527-b519-408e249f672b',
  'x-ms-version',
  '2021-06-08',
  'x-ms-file-change-time',
  '2022-01-18T08:05:12.4770000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:12.4770000Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:12.4770000Z',
  'x-ms-file-permission-key',
  '11010447213779069920*3117928199373521617',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Jan 2022 08:05:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share164249311170306821/dir164249311195803405')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 18 Jan 2022 08:05:12 GMT',
  'ETag',
  '"0x8D9DA594123BFC5"',
  'x-ms-request-id',
  'fe550b68-201a-0006-3042-0c03a9000000',
  'x-ms-client-request-id',
  '88d1d892-f8d9-45fa-af9c-0cdf2cf89ea3',
  'x-ms-version',
  '2021-06-08',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2022-01-18T08:05:12.4770000Z',
  'x-ms-file-last-write-time',
  '2022-01-18T08:05:12.4770000Z',
  'x-ms-file-creation-time',
  '2022-01-18T08:05:12.4770000Z',
  'x-ms-file-permission-key',
  '11010447213779069920*3117928199373521617',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 18 Jan 2022 08:05:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share164249311170306821')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fe550b69-201a-0006-3142-0c03a9000000',
  'x-ms-client-request-id',
  '3fa4e27e-9fa6-49f1-8708-c4d033c8850f',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Tue, 18 Jan 2022 08:05:12 GMT'
]);
