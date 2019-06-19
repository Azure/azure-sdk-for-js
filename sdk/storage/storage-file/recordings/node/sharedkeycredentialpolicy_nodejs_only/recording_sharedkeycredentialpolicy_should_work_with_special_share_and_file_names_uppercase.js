let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty156093662007505784","Upper_another":"Upper_another156093662035006792"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156093661914809302/Dir%20empty156093662007505784')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:27:18 GMT',
  'ETag',
  '"0x8D6F498530FB488"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '855fa046-701a-00cd-5281-265bde000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:27:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156093661914809302/Dir%20empty156093662007505784/Upper_another156093662035006792')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:27:18 GMT',
  'ETag',
  '"0x8D6F498533915ED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b7c47f07-d01a-00c0-3e81-26b4d2000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:27:18 GMT',
  'Connection',
  'close' ]);

