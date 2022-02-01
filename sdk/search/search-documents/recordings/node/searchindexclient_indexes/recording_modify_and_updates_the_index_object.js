let nock = require('nock');

module.exports.hash = "519361aa90cd30f52b9baa528fb4cd71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f3eddbbf7e0e9c9fed3d39d27a7bfef47d46a992d72fa7a5eb579b95d1697f936babd47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396b3e7af4bd5f6c2014337aa7bd5ee1f7d3d962fcbac56bf499a09d4df0f279563639de2edbbc0e3eaa736a9f5fca676dbda68f9aaa6ee56f6d739e4d6934fe276ff36bd39a0970bccccaeb1fe4b54153faee7e9a75fe5e56f5222b0bef93e67a592daf175f642b8cf1fbbf646487995de54db5c89779d33ccf2ff39206e80dfa69b5067a04803b0e70f5072d286f1cb3fced0d593ee0112bc41fd290677933ad8b555b544b1a9937dae8140b9afe6015db8da3d536de70f5939f93f1b6595136342e6fac27d56255e6efdee013c2b3c7fe2465de1b275559e653506c0b2f0ba1eed0f782ad8c5068f0ff3d4af9b49a17b359befc6e5e5ccc5b1a9e0e1f633e5bb6f7f6e823e935c0f4a621eb67ffaf1a337d142842fe78f4117dd67cc9a2411fe8abeb8b0b52a1794d9fa089e94cff747de9076df5365f76ff7ec624d24f887c75f041be9cd6d7dcebef050268bfc5a228b31acaff91b52a3a213ffe4531adaba63a6fc7c73f58d7f9f835d365fce48bbdfbafdd7b44d05d036e22bffc12029c2f32322a53fde0ff01f82fc1d9b2060000"], [
  'Cache-Control',
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
  'W/"0x8D9D237DC4DE0BE"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '9c3b446d-0cbd-4aad-89c8-2720af8685b3',
  'elapsed-time',
  '45',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:46:04 GMT',
  'Content-Length',
  '663'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put(`/indexes('hotel-live-test3')`, {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"semantic":null,"@odata.etag":"\"0x8D9D237DC4DE0BE\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f3eddbbf7e0e9e9d3bdfb07c70f7fdf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcbdacea455616de27cdf5b25a5e2fbec85618e3f77fc9c80e33bbca9b6a912ff3a6799e5fe6250dd01bf4d36a0df40800771ce0ea0f5a50de3866f9db1bb27cc02356883fa421cff2665a17abb6a89634326fb4d1291634fdc12ab61b47ab6dbce1ea273f27e36db3a26c685cde584faac5aaccdfbdc12784678ffd49cabc374eaab2cca7a0d8165e1642dda1ef055b19a1d0e0ff7b94f269352f66b37cf9ddbcb898b7343c1d3ec67cb66cefedd147d26b80e94d43d6cffedf346637e2326bdaaf56a45af3d9971d79784a1fbe2916f997e7e74d0e7248ef01c6fed8656a83a1cb47ff6f1af9f7e9a3c004f0c7a38fe8b3e64b560af481bebabeb820e391d7f4099a98cef44fd7977ed0566ff365f7ef674c20fd848857071fe4cb697dcdbdfe5e2080f65b2c8a32ab61f61e597baaf3f2e35f14d3ba6aaaf3767cfc83759d8f5f335dc64fbed8bbffdabd4704dd35e026f2cb2f21c0f92223733ad50ffe1fc57715eeac070000"], [
  'Cache-Control',
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
  'W/"0x8D9D237DED258A9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '16872f9b-fb13-4b49-91e8-7f3353f45491',
  'elapsed-time',
  '125',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:46:04 GMT',
  'Content-Length',
  '707'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f3eddbbf7e0e9e9d3bdfb07c70f7fdf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcbdacea455616de27cdf5b25a5e2fbec85618e3f77fc9c80e33bbca9b6a912ff3a6799e5fe6250dd01bf4d36a0df40800771ce0ea0f5a50de3866f9db1bb27cc02356883fa421cff2665a17abb6a89634326fb4d1291634fdc12ab61b47ab6dbce1ea273f27e36db3a26c685cde584faac5aaccdfbdc12784678ffd49cabc374eaab2cca7a0d8165e1642dda1ef055b19a1d0e0ff7b94f269352f66b37cf9ddbcb898b7343c1d3ec67cb66cefedd147d26b80e94d43d6cffedf346637e2326bdaaf56a45af3d9971d79784a1fbe2916f997e7e74d0e7248ef01c6fed8656a83a1cb47ff6f1af9f7e9a3c004f0c7a38fe8b3e64b560af481bebabeb820e391d7f4099a98cef44fd7977ed0566ff365f7ef674c20fd848857071fe4cb697dcdbdfe5e2080f65b2c8a32ab61f61e597baaf3f2e35f14d3ba6aaaf3767cfc83759d8f5f335dc64fbed8bbffdabd4704dd35e026f2cb2f21c0f92223733ad50ffe1fc57715eeac070000"], [
  'Cache-Control',
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
  'W/"0x8D9D237DED258A9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'db8c3882-5950-4d9e-924f-5c40910e0863',
  'elapsed-time',
  '20',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:46:04 GMT',
  'Content-Length',
  '707'
]);
