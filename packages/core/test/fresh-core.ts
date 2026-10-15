import { cleanTestStorage, setTestStorageKey, useTestStorageEngine } from "@nanostores/persistent";
import { vi } from "vite-plus/test";

export type Core = typeof import("../src/index.ts");

useTestStorageEngine();

/**
 * Loads a fresh copy of `@arena/core` with empty in-memory stores.
 * `stored` pre-fills the persistent storage, as if left by an earlier session.
 */
export async function freshCore(stored: Record<string, unknown> = {}): Promise<Core> {
  cleanTestStorage();
  for (const [key, value] of Object.entries(stored)) {
    setTestStorageKey(key, typeof value === "string" ? value : JSON.stringify(value));
  }
  vi.resetModules();
  return import("../src/index.ts");
}
