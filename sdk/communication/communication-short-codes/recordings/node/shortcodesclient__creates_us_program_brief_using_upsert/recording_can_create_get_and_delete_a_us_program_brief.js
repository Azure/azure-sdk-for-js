let nock = require('nock');

module.exports.hash = "4cd8a3080bb70f82bbf17c252841b757";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', {"id":"00000000-0000-0000-0000-000000000000","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}})
  .query(true)
  .reply(201, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-15T22:09:19.0798688+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://smstestapp.communication.azure.com/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HxcMUz8CGEiVvd1uB1IUMQ.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2498ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jWe6YQAAAADOnAw1N3dPRqhVhXXLfm1UU0pDRURHRTA1MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 15 Dec 2021 22:09:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2021-12-15T22:09:19.0798688+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XXJQyny41EyV26FZpctn0w.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1454ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0j2e6YQAAAABSjG+fn5PzTrEeGgXXjUgyU0pDRURHRTA1MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 15 Dec 2021 22:09:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'nQTOKfw92ESpVFSSJQ6L6A.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '426ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kWe6YQAAAAAWIWGmY0DoRazjKzKFfgY/U0pDRURHRTA1MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 15 Dec 2021 22:09:21 GMT'
]);
