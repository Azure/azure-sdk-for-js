// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** The endpoint type for a connection analyzer source or destination. */
export enum KnownConnectionAnalyzerEndpointType {
  /** An Azure virtual machine endpoint, identified by its ARM resource ID. */
  VM = "VM",
  /** An Azure virtual machine scale set (or scale set instance) endpoint, identified by its ARM resource ID. */
  Vmss = "VMSS",
  /** An external endpoint reachable from outside Azure, identified by an IP address or FQDN. */
  ExternalAddress = "ExternalAddress",
  /** An Azure Bastion host endpoint, identified by its ARM resource ID. */
  BastionHost = "BastionHost",
  /** An Application Gateway endpoint, identified by its ARM resource ID. */
  ApplicationGateway = "ApplicationGateway",
}

/**
 * The endpoint type for a connection analyzer source or destination. \
 * {@link KnownConnectionAnalyzerEndpointType} can be used interchangeably with ConnectionAnalyzerEndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VM**: An Azure virtual machine endpoint, identified by its ARM resource ID. \
 * **VMSS**: An Azure virtual machine scale set (or scale set instance) endpoint, identified by its ARM resource ID. \
 * **ExternalAddress**: An external endpoint reachable from outside Azure, identified by an IP address or FQDN. \
 * **BastionHost**: An Azure Bastion host endpoint, identified by its ARM resource ID. \
 * **ApplicationGateway**: An Application Gateway endpoint, identified by its ARM resource ID.
 */
export type ConnectionAnalyzerEndpointType = string;
