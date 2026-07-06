// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateAdvancedDiagnosticConsentOfSupportTicket.json
 */
async function updateAdvancedDiagnosticConsentOfASupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTicketsNoSubscription.update("testticket", {
    advancedDiagnosticConsent: "Yes",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateContactDetailsOfSupportTicket.json
 */
async function updateContactDetailsOfASupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTicketsNoSubscription.update("testticket", {
    contactDetails: {
      additionalEmailAddresses: ["tname@contoso.com", "teamtest@contoso.com"],
      country: "USA",
      firstName: "first name",
      lastName: "last name",
      phoneNumber: "123-456-7890",
      preferredContactMethod: "email",
      preferredSupportLanguage: "en-US",
      preferredTimeZone: "Pacific Standard Time",
      primaryEmailAddress: "test.name@contoso.com",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateEscalationStatusOfSupportTicket.json
 */
async function updateEscalationStatusOfASupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTicketsNoSubscription.update("testticket", {
    contactDetails: { phoneNumber: "123-456-7890" },
    directConnectEscalation: {
      azureEEStatus: "EscalationInitiated",
      reasonForEscalation: "Server is down and business is impacted",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateSeverityOfSupportTicket.json
 */
async function updateSeverityOfASupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTicketsNoSubscription.update("testticket", {
    severity: "critical",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @summary this API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 * x-ms-original-file: 2026-07-01/UpdateStatusOfSupportTicket.json
 */
async function updateStatusOfASupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTicketsNoSubscription.update("testticket", {
    status: "closed",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAdvancedDiagnosticConsentOfASupportTicket();
  await updateContactDetailsOfASupportTicket();
  await updateEscalationStatusOfASupportTicket();
  await updateSeverityOfASupportTicket();
  await updateStatusOfASupportTicket();
}

main().catch(console.error);
