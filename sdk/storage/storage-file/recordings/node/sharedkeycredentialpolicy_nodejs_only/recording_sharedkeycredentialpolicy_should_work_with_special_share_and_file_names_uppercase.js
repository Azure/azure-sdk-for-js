let nock = require('nock');

module.exports.testInfo = {"Dir empty":"Dir empty156044277369008892","Upper_another":"Upper_another156044277399507786"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044277273507696/Dir%20empty156044277369008892')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'ETag',
  '"0x8D6EFE036913005"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7330e41c-101a-0031-4dc9-212146000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:19:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156044277273507696/Dir%20empty156044277369008892/Upper_another156044277399507786')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'ETag',
  '"0x8D6EFE036B84702"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbb21ef7-a01a-006c-18c9-21d142000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'Connection',
  'close' ]);

