// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function addLroCompatShims(
  host: object,
  methodName: string,
  options?: { force?: boolean },
): void {
  const proto = Object.getPrototypeOf(host);
  if (!proto) return;

  const beginName = "begin" + methodName[0].toUpperCase() + methodName.slice(1);
  const beginAndWaitName = beginName + "AndWait";

  if (options?.force || !proto[beginName]) {
    proto[beginName] = function (...args: any[]): any {
      return (this as any)[methodName](...args);
    };
  }

  if (options?.force || !proto[beginAndWaitName]) {
    proto[beginAndWaitName] = async function (...args: any[]): Promise<any> {
      return (this as any)[methodName](...args);
    };
  }
}

export function wrapOperationGroupFactory<TFactory extends (...a: any[]) => any>(
  factory: TFactory,
  groupName: string,
  metadata: Array<{ path: string[]; method: string }>,
): TFactory {
  return ((...args: any[]) => {
    const group = factory(...args);
    for (const entry of metadata) {
      if (entry.path.length === 1 && entry.path[0] === groupName) {
        addLroCompatShims(group, entry.method);
      }
    }
    return group;
  }) as TFactory;
}

export function applyClientLroCompat(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  client: any,
  metadata: Array<{ path: string[]; method: string }>,
): void {
  for (const entry of metadata) {
    if (entry.path.length === 0) {
      addLroCompatShims(client, entry.method);
    } else {
      // shallow, package can override for deeper cases
      const seg = entry.path[0];
      if (client[seg]) {
        addLroCompatShims(client[seg], entry.method);
      }
    }
  }
}
