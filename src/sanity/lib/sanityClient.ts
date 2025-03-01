import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "q09xn9h8",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});
