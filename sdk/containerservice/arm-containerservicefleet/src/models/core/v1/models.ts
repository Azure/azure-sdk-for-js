// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** A toleration operator is the set of operators that can be used in a toleration. */
export enum KnownTolerationOperator {
  /** Toleration Operator Exists */
  Exists = "Exists",
  /** Toleration Operator Equal */
  Equal = "Equal",
}

/**
 * A toleration operator is the set of operators that can be used in a toleration. \
 * {@link KnownTolerationOperator} can be used interchangeably with TolerationOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Exists**: Toleration Operator Exists \
 * **Equal**: Toleration Operator Equal
 */
export type TolerationOperator = string;

/** TaintEffect */
export enum KnownTaintEffect {
  /** Do not allow new pods to schedule onto the node unless they tolerate the taint, but allow all pods submitted to Kubelet without going through the scheduler to start, and allow all already-running pods to continue running. Enforced by the scheduler. */
  NoSchedule = "NoSchedule",
}

/**
 * TaintEffect \
 * {@link KnownTaintEffect} can be used interchangeably with TaintEffect,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoSchedule**: Do not allow new pods to schedule onto the node unless they tolerate the taint, but allow all pods submitted to Kubelet without going through the scheduler to start, and allow all already-running pods to continue running. Enforced by the scheduler.
 */
export type TaintEffect = string;
