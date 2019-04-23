let nock = require('nock');

module.exports.testInfo = {}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"comp":"list","timeout":"30"})
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://coolstorageaccount1234.queue.core.windows.net/\"><Queues><Queue><Name>queue155483405768205404155483405788906817</Name></Queue><Queue><Name>queue155483426437908271155483426458002903</Name></Queue><Queue><Name>queue155483433938803314</Name></Queue><Queue><Name>queue155483452785202629</Name></Queue><Queue><Name>queue155483457906508658</Name></Queue><Queue><Name>queue155483479584607744</Name></Queue><Queue><Name>queue155483482334809292</Name></Queue><Queue><Name>queue155483543797607836155483543818007056</Name></Queue><Queue><Name>queue155501787749505375</Name></Queue><Queue><Name>queue155503443915501021</Name></Queue><Queue><Name>queue155511219334507515</Name></Queue><Queue><Name>queue155544800150407930</Name></Queue><Queue><Name>queue155544918371908434</Name></Queue><Queue><Name>queue155544962983001819</Name></Queue><Queue><Name>queue155544986383707779</Name></Queue><Queue><Name>queue155545024069308547</Name></Queue><Queue><Name>queue155545043737902953</Name></Queue><Queue><Name>queue155545050476407215</Name></Queue><Queue><Name>queue155545056111608466</Name></Queue><Queue><Name>queue155545065162406397</Name></Queue><Queue><Name>queue155545068015502450</Name></Queue><Queue><Name>queue155545097358902471</Name></Queue><Queue><Name>queue155545099902606000</Name></Queue><Queue><Name>queue155545128572206488</Name></Queue><Queue><Name>queue155545166310009676</Name></Queue><Queue><Name>queue155545172210906604</Name></Queue><Queue><Name>queue155545179582409038</Name></Queue><Queue><Name>queue155545274807300685</Name></Queue><Queue><Name>queue155545284053209449</Name></Queue><Queue><Name>queue155545328179800835</Name></Queue><Queue><Name>queue155545351693501292</Name></Queue><Queue><Name>queue155545361868003824</Name></Queue><Queue><Name>queue155545387925600405</Name></Queue><Queue><Name>queue155545399036005105</Name></Queue><Queue><Name>queue155545437607500437</Name></Queue><Queue><Name>queue155545551147102722155545551187402194</Name></Queue><Queue><Name>queue155545555298102350</Name></Queue><Queue><Name>queue155545569134801529155545569155508569</Name></Queue><Queue><Name>queue155545705237404422</Name></Queue><Queue><Name>queue155545724064000112</Name></Queue><Queue><Name>queue155545790439708504</Name></Queue><Queue><Name>queue155546433369407390155546433412406887</Name></Queue><Queue><Name>queue155546473464107894</Name></Queue><Queue><Name>queue155546523956905940155546523998806410</Name></Queue><Queue><Name>queue155546547535507696155546547577306159</Name></Queue><Queue><Name>queue155546679724101095155546679791407913</Name></Queue><Queue><Name>queue155546705171106877155546705211206202</Name></Queue><Queue><Name>queue155546709128104440</Name></Queue><Queue><Name>queue155546748042501015</Name></Queue><Queue><Name>queue155546797263001178</Name></Queue><Queue><Name>queue155546807223507139</Name></Queue><Queue><Name>queue155562509572107085155562509614300151</Name></Queue><Queue><Name>queue155562513903203216</Name></Queue><Queue><Name>queue155562545966800716155562545988000218</Name></Queue><Queue><Name>queue155562877945804498</Name></Queue><Queue><Name>queue155562977894007925</Name></Queue><Queue><Name>queue155562989464506986</Name></Queue><Queue><Name>queue155563012885904071155563012928702815</Name></Queue><Queue><Name>queue155563017110702535</Name></Queue><Queue><Name>queue155563628074206311155563628116502612</Name></Queue><Queue><Name>queue155563632236408241</Name></Queue><Queue><Name>queue155563636332004410155563636352502593</Name></Queue><Queue><Name>queue155564193647906536</Name></Queue><Queue><Name>queue155564590885204877</Name></Queue><Queue><Name>queue155596606782400549155596606824307237</Name></Queue></Queues><NextMarker /></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c3e2d5d-3003-001f-294d-f94648000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 20:53:20 GMT',
  'Connection',
  'close' ]);
