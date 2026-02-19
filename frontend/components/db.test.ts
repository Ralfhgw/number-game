import { describe, it, expect } from "vitest";
import sql from "./db";

describe("db connection", () => {
  it("should connect and execute a simple query", async () => {
    const result = await sql`SELECT 1 as value`;
    
    expect(result[0].value).toBe(1);
  });
});