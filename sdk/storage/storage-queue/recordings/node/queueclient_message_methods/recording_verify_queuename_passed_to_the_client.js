let nock = require('nock');

module.exports.testInfo = {"queue":"queue157015983378300744"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157015983378300744')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57784f75-d003-005d-3164-7a96f8000000',
  'x-ms-client-request-id',
  '74bf578c-9841-4aed-a4a1-202acfdc5c42',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 03:30:33 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157015983378300744')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47ea03d4-2003-006a-3b64-7a3a57000000',
  'x-ms-client-request-id',
  '046d1334-ab72-4a81-a045-c8c48257cd28',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 03:30:34 GMT' ]);

