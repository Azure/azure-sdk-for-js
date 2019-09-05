let nock = require('nock');

module.exports.testInfo = {"share":"share156767545621001439"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767545621001439')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:16 GMT',
  'ETag',
  '"0x8D731E2D2C4F8C8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbfa5090-501a-0045-4ccb-632260000000',
  'x-ms-client-request-id',
  'a18b4b5e-0bf3-4c60-ab44-39e616c6069a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767545621001439')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5429c8f-c01a-001a-54cb-63965c000000',
  'x-ms-client-request-id',
  'cd1958fc-7ff8-4291-a760-278e1eedf246',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:16 GMT',
  'Connection',
  'close' ]);

