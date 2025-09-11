// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2025-06-23-preview/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.update("rgneon", "myOrganization", {
    properties: {
      marketplaceDetails: {
        subscriptionId: "11111111-2222-3333-4444-555555555555",
        subscriptionStatus: "Fulfilled",
        offerDetails: {
          publisherId: "neon",
          offerId: "neon-postgres",
          planId: "standard",
          planName: "Standard Plan",
          termUnit: "P1M",
          termId: "hjk5-pou9-mnb8",
        },
      },
      userDetails: {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        upn: "johndoe",
        phoneNumber: "555-123-4567",
      },
      companyDetails: {
        companyName: "Contoso Ltd.",
        country: "United States",
        officeAddress: "123 Main Street, Seattle, WA 98101",
        businessPhone: "555-987-6543",
        domain: "contoso.com",
        numberOfEmployees: 250,
      },
      partnerOrganizationProperties: {
        organizationId: "org-123456",
        organizationName: "myOrganization",
        singleSignOnProperties: {
          singleSignOnState: "Configured",
          enterpriseAppId: "12345678-abcd-1234-efgh-123456789012",
          singleSignOnUrl: "https://login.microsoftonline.com/contoso.com",
          aadDomains: ["contoso.com"],
        },
      },
      projectProperties: {
        entityName: "myProject",
        attributes: [{ name: "environment", value: "development" }],
        regionId: "westus",
        storage: 22,
        pgVersion: 23,
        historyRetention: 16,
        defaultEndpointSettings: {
          autoscalingLimitMinCu: 11,
          autoscalingLimitMaxCu: 11,
        },
        branch: {
          entityName: "main",
          attributes: [{ name: "environment", value: "development" }],
          projectId: "project-123",
          parentId: "main-branch",
          roles: [
            {
              entityName: "read_only_role",
              attributes: [{ name: "environment", value: "development" }],
              branchId: "branch-123",
              permissions: ["SELECT"],
              isSuperUser: true,
            },
          ],
          databases: [
            {
              entityName: "appdb",
              attributes: [{ name: "environment", value: "development" }],
              branchId: "branch-123",
              ownerName: "postgres",
            },
          ],
          endpoints: [
            {
              entityName: "primary-endpoint",
              attributes: [{ name: "environment", value: "development" }],
              projectId: "project-123",
              branchId: "branch-123",
              endpointType: "read_write",
              size: { autoscalingLimitMinCu: 1, autoscalingLimitMaxCu: 4 },
            },
          ],
        },
        roles: [
          {
            entityName: "admin_role",
            attributes: [{ name: "environment", value: "development" }],
            branchId: "branch-123",
            permissions: ["ALL"],
            isSuperUser: true,
          },
        ],
        databases: [
          {
            entityName: "postgres",
            attributes: [{ name: "environment", value: "development" }],
            branchId: "branch-123",
            ownerName: "postgres",
          },
        ],
        endpoints: [
          {
            entityName: "readonly-endpoint",
            attributes: [{ name: "environment", value: "development" }],
            projectId: "project-123",
            branchId: "branch-123",
            endpointType: "read_only",
            size: { autoscalingLimitMinCu: 1, autoscalingLimitMaxCu: 2 },
          },
        ],
      },
    },
    tags: { key2979: "ovumlkykfrh" },
  });
  console.log(result);
}

async function main() {
  await organizationsUpdateMaximumSet();
}

main().catch(console.error);
