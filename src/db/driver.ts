import neo4j from "npm:neo4j-driver";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.181.0/testing/asserts.ts";
/**
 * Create a new driver instance to connect to Neo4j
 * @type {neo4j.Driver}
 * @see https://neo4j.com/docs/api/javascript-driver/current/class/src/driver.js~Driver.html
 * @see https://neo4j.com/docs/api/javascript-driver/current/global.html#Config
 */
export const driver: neo4j.Driver = neo4j.driver(
  Deno.env.get("NEO4J_URI") as string,
  neo4j.auth.basic(
    Deno.env.get("NEO4J_USER") as string,
    Deno.env.get("NEO4J_PASSWORD") as string,
  ),
);

Deno.test("driver should return a valid Neo4j driver instance", () => {
  const neo4jDriver = driver;
  assertEquals(neo4jDriver instanceof neo4j.Driver, true);
});

Deno.test("Check if the Neo4j server is running  locally via docker", () => {
  const neo4jDriver = driver;
  const getServerInfo = async () => await neo4jDriver.getServerInfo();
  assert(getServerInfo);
});

// Run the benchmark
Deno.bench("Benchmarking the Neo4j driver", () => {
  const neo4jDriver = driver;
  const getServerInfo = async () => await neo4jDriver.getServerInfo();
  getServerInfo();
});
