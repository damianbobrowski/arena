import { persistentAtom } from "@nanostores/persistent";
import type { WritableAtom } from "nanostores";

type BooleanKey<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];

/**
 * A JSON-encoded persistent store of a flat object. Missing, malformed or
 * mistyped stored fields fall back to `initial`, key by key; `normalize` then
 * repairs out-of-range values left by an earlier session.
 */
export function persistedObject<T extends object>(
  key: string,
  initial: T,
  normalize: (value: T) => T = (value) => value,
): WritableAtom<T> {
  return persistentAtom<T>(`arena:${key}`, initial, {
    encode: JSON.stringify,
    decode(raw) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        return initial;
      }
      if (typeof parsed !== "object" || parsed === null) return initial;
      const merged = { ...initial };
      for (const k of Object.keys(initial) as (keyof T)[]) {
        const value = (parsed as Partial<T>)[k];
        if (typeof value === typeof initial[k]) merged[k] = value as T[keyof T];
      }
      return normalize(merged);
    },
  });
}

/** An inclusive [min, max] range in pixels. */
export type PxRange = readonly [min: number, max: number];

/** Rounds to whole pixels and clamps into the range. */
export function clampPx(px: number, [min, max]: PxRange): number {
  return Math.min(max, Math.max(min, Math.round(px)));
}

/** Flips one boolean field of an object store. */
export function toggleField<T extends object>(store: WritableAtom<T>, key: BooleanKey<T>): void {
  const value = store.get();
  store.set({ ...value, [key]: !value[key] });
}
