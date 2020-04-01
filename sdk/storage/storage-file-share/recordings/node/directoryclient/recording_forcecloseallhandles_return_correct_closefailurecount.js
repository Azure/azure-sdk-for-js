let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157726170127501480","dir":"dir157726170263305708"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726170127501480')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:15:02 GMT',
  'ETag',
  '"0x8D789128AAAB60D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '38497e70-601a-0000-6cfb-ba923b000000',
  'x-ms-client-request-id',
  '168e0454-42a7-4a7a-afee-77e31da9407a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:15:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726170127501480/dir157726170263305708')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Dec 2019 08:15:03 GMT',
  'ETag',
  '"0x8D789128B75C020"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2aafcbcb-401a-0028-16fb-baf393000000',
  'x-ms-client-request-id',
  '74782606-d99b-40d7-a422-31557a04712e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-25T08:15:03.8381088Z',
  'x-ms-file-last-write-time',
  '2019-12-25T08:15:03.8381088Z',
  'x-ms-file-creation-time',
  '2019-12-25T08:15:03.8381088Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 25 Dec 2019 08:15:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157726170127501480/dir157726170263305708')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '630f835a-f01a-0012-4dfb-bae9eb000000',
  'x-ms-client-request-id',
  '40958fd3-ecb1-46ff-a69c-45aba2a64fac',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Wed, 25 Dec 2019 08:18:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157726170127501480')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7e50d14-901a-003b-6bfb-bad79f000000',
  'x-ms-client-request-id',
  'a3fb5e2b-4953-4dae-b499-383df36661f4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Dec 2019 08:18:18 GMT'
]);
