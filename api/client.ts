// Thin typed client for the demo backend.
//
// This uses the `paths` type from api/schema.ts as if it had been generated
// by `openapi-typescript`. Rather than pulling in another runtime client
// library, we keep this as a very small wrapper around `fetch`.

import type { paths, FooRequest, FooResponse } from "./schema";

type FooPostOperation = paths["/foo"]["post"];
type FooRequestBody = FooPostOperation["requestBody"]["content"]["application/json"];
type FooSuccess = FooPostOperation["responses"][200]["content"]["application/json"];

const DEFAULT_BASE_URL = "http://localhost:8000";

const baseUrl =
  process.env.EXPO_PUBLIC_API_URL && process.env.EXPO_PUBLIC_API_URL.length > 0
    ? process.env.EXPO_PUBLIC_API_URL
    : DEFAULT_BASE_URL;

export async function postFoo(body: FooRequest | FooRequestBody): Promise<FooSuccess> {
  const response = await fetch(`${baseUrl}/foo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`POST /foo failed with status ${response.status}`);
  }

  const data = (await response.json()) as FooResponse[];
  return data;
}
