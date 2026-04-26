import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const stubClient = {
  fetch: async () => null,
} as unknown as ReturnType<typeof createClient>;

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : stubClient;
