let nock = require('nock');

module.exports.hash = "3d97ff9d22e9a276fdd7f3a10e7555b3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0ff61fde3f39397df064f7fea70f7edf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c8887dbac827ef491669f1b344159f2ef36236cb97dfcd8b8b794b43d1a1627c67cbf6de1e7d247d085a8a8b3f3cfd28189f7eb66980fac9cfd608e9a34059f1c7a38fe8b3e64b6671fa405f5d5f5c909acb6bfa044d0c68fdb3addee6cba2f3f7331ebf7e42b4a9830ff2e5b4bee64e7e2f8c4ebb29164599d5d0c78faca2576afff817c5b4ae9aeabc1d1fff605de7e3d73ce8f1932ff6eebf76ef11b5760db889fcf24b7ec9ff0388125e7035060000"], [ 'Cache-Control',
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
  'W/"0x8D8495CCE7B1567"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2bab9c7f-d884-4805-a48e-0b4bafafb31e',
  'elapsed-time',
  '42',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:10:24 GMT',
  'Content-Length',
  '662' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":true,"sortable":false,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D8495CCE7B1567\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0ff61fde3f397976bafb60efe1deeffb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9beb65b5bc5e7c91ad30a2efff92911d54769537d5225fe64df33cbfcc4b1a8e37c4a7d51ac81000ee26c0cc1fa220b87184f2b73740f980c7a7107f560638cb9b695dacdaa25ad238bcb145a74f90f287a6b86d1c9bb6f106a79ffc1046d76645d9d028bc919d548b5599bf7b834f08ab1e2393bc786f9c5465994f419f2dbc2c64b943df0b6e321e19b14f17f9e43dc9222d7e96a8e2d3655ecc66f9f2bb7971316f69283a548cef6cd9dedba38fa40f414b71f187a71f05e3d3cf360d503ff9591aa11b5f9935ed572b527ff9eccb0e5f3fa50fdf148bfccbf3f326c7e0a5af003f7fa43227c140e5a39fbb717e9f3e0a94327f3cfa883e6bbe6451a60ff4d5f5c505a9f3bca64fd0c480d63fdbea6dbe2c3a7f3fe3d1eb2744993af8205f4eeb6beee4f7c2e8b49b625194590dbbf3c81a3425fa8f7f514cebaaa9cedbf1f10fd6753e7ecd831e3ff962effe6bf71e516bd7809bc82fbfe497fc3fcec0f4c71d070000"], [ 'Cache-Control',
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
  'W/"0x8D8495CCFE17292"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7b24b44c-1418-45ad-acda-5e825c834060',
  'elapsed-time',
  '163',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:10:24 GMT',
  'Content-Length',
  '705' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0ff61fde3f397976bafb60efe1deeffb11b55a668b9cbe9e576d5e6e97c565be8d6eefd137b3fc3c5b97edeb695517cb8b9775755e94d474b92ecbd147e7455ece9a8f1e7def171b08c58cde69af57f8fd74b618bf6ef11a7d26686713bc7c9e954d8eb7cb36af838fea9cdae797f2595bafe9a3a6aa5bf95bdb9c67531a8dffc9dbfcdab466021c2fb3f2fa07796dd094bebb9f669dbf9beb65b5bc5e7c91ad30a2efff92911d54769537d5225fe64df33cbfcc4b1a8e37c4a7d51ac81000ee26c0cc1fa220b87184f2b73740f980c7a7107f560638cb9b695dacdaa25ad238bcb145a74f90f287a6b86d1c9bb6f106a79ffc1046d76645d9d028bc919d548b5599bf7b834f08ab1e2393bc786f9c5465994f419f2dbc2c64b943df0b6e321e19b14f17f9e43dc9222d7e96a8e2d3655ecc66f9f2bb7971316f69283a548cef6cd9dedba38fa40f414b71f187a71f05e3d3cf360d503ff9591aa11b5f9935ed572b527ff9eccb0e5f3fa50fdf148bfccbf3f326c7e0a5af003f7fa43227c140e5a39fbb717e9f3e0a94327f3cfa883e6bbe6451a60ff4d5f5c505a9f3bca64fd0c480d63fdbea6dbe2c3a7f3fe3d1eb2744993af8205f4eeb6beee4f7c2e8b49b625194590dbbf3c81a3425fa8f7f514cebaaa9cedbf1f10fd6753e7ecd831e3ff962effe6bf71e516bd7809bc82fbfe497fc3fcec0f4c71d070000"], [ 'Cache-Control',
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
  'W/"0x8D8495CCFE17292"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'df4894c7-9db8-43d1-960d-696fb70518d6',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:10:24 GMT',
  'Content-Length',
  '705' ]);
