let nock = require('nock');

module.exports.testInfo = {"queue":"queue157015983465901950"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157015983465901950')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2f8388a-0003-0010-1664-7a501a000000',
  'x-ms-client-request-id',
  '1a1933a3-1e3e-4838-a018-816577df6eb1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 03:30:34 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157015983465901950')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69b6be73-9003-0037-4164-7aca53000000',
  'x-ms-client-request-id',
  '8a89c87f-71de-40c4-af55-3d99063ab13a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 03:30:34 GMT' ]);

