let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty156599452316406430","Upper_another":"Upper_another156599452347809676"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156599452216203149/Dir%20empty156599452316406430')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:43 GMT',
  'ETag',
  '"0x8D7229918992D35"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28bfb245-c01a-00d6-1281-54314b000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:28:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156599452216203149/Dir%20empty156599452316406430/Upper_another156599452347809676')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:28:43 GMT',
  'ETag',
  '"0x8D7229918C65FC6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7de6bc3-701a-008b-1181-54c14f000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 16 Aug 2019 22:28:43 GMT',
  'Connection',
  'close' ]);

