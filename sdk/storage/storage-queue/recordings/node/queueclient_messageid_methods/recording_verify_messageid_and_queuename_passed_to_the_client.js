let nock = require('nock');

module.exports.testInfo = {"queue":"queue157015983267802797"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157015983267802797')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea847645-0003-001b-7264-7a486e000000',
  'x-ms-client-request-id',
  'a1d7255b-a49c-40eb-bf6a-f6ed56e24710',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 03:30:32 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157015983267802797')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be123360-c003-0024-6c64-7affb2000000',
  'x-ms-client-request-id',
  'b6373186-65e4-40a9-a052-1848daad379f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 03:30:33 GMT' ]);

