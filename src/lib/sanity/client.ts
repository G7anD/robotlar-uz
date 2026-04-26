import { createClient } from "next-sanity";

type QueryParams = Record<string, unknown>;
import { apiVersion, dataset, projectId } from "@/sanity/env";

const isConfigured = Boolean(projectId);

if (!isConfigured) {
  // Build-time / Vercel deploy can run without env vars; warn loudly so logs
  // show this is degraded mode. Runtime fetch calls below short-circuit to
  // null and the caller's static fallback applies.
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity client is disabled.",
  );
}

const realClient = isConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

export const client = realClient ?? {
  fetch: async () => null,
} as unknown as NonNullable<typeof realClient>;

/**
 * Wrapper around `client.fetch` that logs Sanity errors with context and
 * returns `null` so the caller can fall back to static content. Use this
 * in route handlers / pages where a Sanity outage should not 500 the page.
 */
export async function safeFetch<T>(
  query: string,
  params?: QueryParams,
  context?: string,
): Promise<T | null> {
  if (!realClient) return null;
  try {
    return await realClient.fetch<T>(query, params ?? {});
  } catch (err) {
    const tag = context ? ` [${context}]` : "";
    console.error(`[sanity]${tag} fetch failed:`, err);
    return null;
  }
}

export const isSanityConfigured = isConfigured;
