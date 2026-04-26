import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

type QueryParams = Record<string, unknown>;

// Server-side only: token enables reads against private datasets. This file is
// imported from React Server Components and never ships to the browser bundle,
// so the token does not leak.
const token = process.env.SANITY_API_TOKEN;

const realClient: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, token })
  : null;

if (!realClient) {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity reads return null.",
  );
}

export const isSanityConfigured = realClient !== null;

/**
 * Fetch with structured logging and a `null` fallback so a Sanity outage or a
 * missing config does not 500 the page. Callers decide whether to fall back to
 * static content or render an empty state.
 */
export async function safeFetch<T>(
  query: string,
  params?: QueryParams,
  context?: string,
): Promise<T | null> {
  if (!realClient) return null;
  try {
    const tags = context ? ["sanity", `sanity:${context}`] : ["sanity"];
    return await realClient.fetch<T>(query, params ?? {}, {
      next: { revalidate: 60, tags },
    });
  } catch (err) {
    const tag = context ? ` [${context}]` : "";
    console.error(`[sanity]${tag} fetch failed:`, err);
    return null;
  }
}

export const sanityClient = realClient;
