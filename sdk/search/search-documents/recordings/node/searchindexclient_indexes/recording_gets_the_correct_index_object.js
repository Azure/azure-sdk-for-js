let nock = require('nock');

module.exports.hash = "958fbdf847b133b43f5a528897a434c8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0fee9d1eec3db9bf77ba7befe1f1effb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9beb65b5bc5e7c91ad30a2efff92911d54769537d5225fe64df33cbfcc4b1a8e37c4a7d51ac81000ee26c0cc1fa220b87184f2b73740f980c7a7107f560638cb9b695dacdaa25ad238bcb145a74f90f287a6b86d1c9bb6f106a79ffc1046d76645d9d028bc919d548b5599bf7b834f08ab1e2393bc786f9c5465994f419f2dbc2c64b943df0b6e321e19b14f17f9e43dc9222d7e96a8e2d3655ecc66f9f2bb7971316f69283a548cef6cd9dedba38fa40f414b71f187a71f05e3d3cf360d503ff9d91a217d14282bfe78f4117dd67cc92c4e1fe8abeb8b0b5273794d9fa08901ad7fb6d5db7c5974fe7ec6e3d74f883675f041be9cd6d7dcc9ef85d16937c5a228b31afaf89155f44aed1fffa298d655539db7e3e31faceb7cfc9a073d7ef2c5defdd7ee3da2d6ae0137915f7ec92ff97f00fca611ab35060000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83E82B52E139A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '48a1c2b8-67a7-46c3-8551-254f2035d21a',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:59 GMT',
  'Content-Length',
  '662' ]);
