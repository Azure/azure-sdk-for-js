let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758132656501241"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758132656501241')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c1245ba-7003-00eb-19f0-628f71000000',
  'x-ms-client-request-id',
  '55d5dc5d-392e-449c-82ec-a377888c2063',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .post('/queue156758132656501241/messages', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><QueueMessage><MessageText>!@#$%^&amp;*()_+`-=[]|};'\":,./?&gt;&lt;`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍&lt;񐸩԰Bu)򁉂񖨞á&lt;џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦é</MessageText></QueueMessage>")
  .query(true)
  .reply(201, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d408c6f8-f67d-40ce-aa90-091ecc8b724c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:27 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:07 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAAGHTphvBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:27 GMT</TimeNextVisible></QueueMessage></QueueMessagesList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aaff88ed-f003-00ca-1bf0-62ab0a000000',
  'x-ms-client-request-id',
  '97ef5343-bda3-4286-8b0b-1c59f5a7b890',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132656501241/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d408c6f8-f67d-40ce-aa90-091ecc8b724c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:27 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:07 GMT</ExpirationTime><DequeueCount>0</DequeueCount><MessageText>!@#$%^&amp;*()_+`-=[]|};'\":,./?&gt;&lt;`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍&lt;񐸩԰Bu)򁉂񖨞á&lt;џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦é</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7856749e-1003-00fd-43f0-6279a6000000',
  'x-ms-client-request-id',
  '687aaffc-d6ae-4553-b47a-f9be884c457c',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue156758132656501241/messages')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><QueueMessagesList><QueueMessage><MessageId>d408c6f8-f67d-40ce-aa90-091ecc8b724c</MessageId><InsertionTime>Wed, 04 Sep 2019 07:15:27 GMT</InsertionTime><ExpirationTime>Wed, 04 Sep 2019 07:16:07 GMT</ExpirationTime><PopReceipt>AgAAAAMAAAAAAAAA3oRZjfBi1QE=</PopReceipt><TimeNextVisible>Wed, 04 Sep 2019 07:15:38 GMT</TimeNextVisible><DequeueCount>1</DequeueCount><MessageText>!@#$%^&amp;*()_+`-=[]|};'\":,./?&gt;&lt;`~漢字㒈保ᨍ揫^p[뷁)׷񬓔7񈺝l鮍򧽶ͺ簣ڞ츊䈗㝯綞߫⯹?ÎᦡC왶żsmt㖩닡򈸱𕩣ОլFZ򃀮9tC榅ٻ컦驿Ϳ[𱿛봻烌󱰷򙥱Ռ򽒏򘤰δŊϜ췮㐦9ͽƙp퐂ʩ由巩KFÓ֮򨾭⨿󊻅aBm󶴂旨Ϣ񓙠򻐪񇧱򆋸ջ֨ipn򒷐ꝷՆ򆊙斡賆𒚑m˞𻆕󛿓򐞺Ӯ򡗺򴜍&lt;񐸩԰Bu)򁉂񖨞á&lt;џɏ嗂�⨣1PJ㬵┡ḸI򰱂ˮaࢸ۳i灛ȯɨb𹺪򕕱뿶uٔ䎴񷯆Φ륽󬃨س_NƵ¦é</MessageText></QueueMessage></QueueMessagesList>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ea264c1-4003-00f0-0ef0-62b172000000',
  'x-ms-client-request-id',
  'b8fd57f9-a118-4517-a55e-a9cacc6a1b8b',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758132656501241')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aafeff8e-1003-0106-62f0-623a31000000',
  'x-ms-client-request-id',
  '8a708ac9-1450-4dfd-9684-4dddee5ace56',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:27 GMT',
  'Connection',
  'close' ]);

