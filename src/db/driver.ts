import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.181.0/testing/asserts.ts";

import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts"
import type neo4j from 'npm:neo4j-driver';

// import neo4j from github because npm is not working
//@deno-types='npm:neo4j-driver'
import db from 'https://raw.githubusercontent.com/neo4j/neo4j-javascript-driver/5.0/packages/neo4j-driver-deno/lib/mod.ts';

// load environment variables
await load({export: true});

// define environment variables
const env = {
  NEO4J_URI: Deno.env.get('NEO4J_URI') as string,
  NEO4J_USER: Deno.env.get('NEO4J_USERNAME') as string,
  NEO4J_PASSWORD: Deno.env.get('NEO4J_PASSWORD') as string
}

/**
 * Create a new driver instance to connect to Neo4j
 * @type {neo4j.Driver}
 * @see https://neo4j.com/docs/api/javascript-driver/current/class/src/driver.js~Driver.html
 * @see https://neo4j.com/docs/api/javascript-driver/current/global.html#Config
 */
const driver:neo4j.Driver = db.driver(
  env.NEO4J_URI, 
  db.auth.basic(
    env.NEO4J_USER,
    env.NEO4J_PASSWORD
));

export default driver;

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
