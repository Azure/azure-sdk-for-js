let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816839267402658"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816839267402658')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8da7522c-5003-0047-5b47-68b997000000',
  'x-ms-client-request-id',
  'c4db8d9c-a465-48a0-b5a0-fae4dce6f895',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156816839267402658/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>Hello World</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>c4c2cb0b-efc0-4a5d-8bec-f52ca525234d</MessageId><InsertionTime>Wed, 11 Sep 2019 02:19:53 GMT</InsertionTime><ExpirationTime>Wed, 18 Sep 2019 02:19:53 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAArSaiZUdo1QE=</PopReceipt><TimeNextVisible>Wed, 11 Sep 2019 02:19:53 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45d38bef-9003-0015-2d47-68a465000000',
  'x-ms-client-request-id',
  '9f204d60-168b-4ba7-9699-0bd711e876a4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:52 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816839267402658')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '341e9b9c-2003-0025-5847-68fe4f000000',
  'x-ms-client-request-id',
  '0ce272e2-1d36-447f-97d3-5113dd2118ea',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:53 GMT' ]);

