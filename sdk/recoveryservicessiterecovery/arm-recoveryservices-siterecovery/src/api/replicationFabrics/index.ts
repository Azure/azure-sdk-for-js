// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  removeInfra,
  renewCertificate,
  $delete,
  reassociateGateway,
  migrateToAad,
  checkConsistency,
  list,
  purge,
  create,
  get,
} from "./operations.js";
export type {
  ReplicationFabricsRemoveInfraOptionalParams,
  ReplicationFabricsRenewCertificateOptionalParams,
  ReplicationFabricsDeleteOptionalParams,
  ReplicationFabricsReassociateGatewayOptionalParams,
  ReplicationFabricsMigrateToAadOptionalParams,
  ReplicationFabricsCheckConsistencyOptionalParams,
  ReplicationFabricsListOptionalParams,
  ReplicationFabricsPurgeOptionalParams,
  ReplicationFabricsCreateOptionalParams,
  ReplicationFabricsGetOptionalParams,
} from "./options.js";
