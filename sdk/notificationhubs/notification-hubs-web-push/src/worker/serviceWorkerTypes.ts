// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ServiceWorkerGlobalScope {
  readonly location: WorkerLocation;
  readonly clients: Clients;
  readonly registration: ServiceWorkerRegistration;
  addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(
    type: K,
    listener: (
      this: ServiceWorkerGlobalScope,
      ev: ServiceWorkerGlobalScopeEventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

// Same as the previous interface
export interface ServiceWorkerGlobalScopeEventMap {
  notificationclick: NotificationEvent;
  push: PushEvent;
  pushsubscriptionchange: PushSubscriptionChangeEvent;
}

export interface PushSubscriptionChangeEvent extends ExtendableEvent {
  readonly newSubscription?: PushSubscription;
  readonly oldSubscription?: PushSubscription;
}
