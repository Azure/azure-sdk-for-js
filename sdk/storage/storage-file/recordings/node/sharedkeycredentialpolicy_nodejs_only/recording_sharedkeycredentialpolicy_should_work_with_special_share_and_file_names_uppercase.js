let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty156404685977708064","Upper_another":"Upper_another156404686004304216"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156404685897002385/Dir%20empty156404685977708064')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'ETag',
  '"0x8D710E1D4B0CD11"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23c1d8ca-b01a-0131-05ca-422314000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156404685897002385/Dir%20empty156404685977708064/Upper_another156404686004304216')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:24:02 GMT',
  'ETag',
  '"0x8D710E1D4DA2E90"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '652959f1-e01a-00ae-7eca-421dfb000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:24:01 GMT',
  'Connection',
  'close' ]);

