import { neon } from "@neondatabase/serverless";
import seed from "@/data/seed-profiles.json";

let sqlClient;
export function sql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set. Connect a Neon Postgres database in Vercel.");
  if (!sqlClient) sqlClient = neon(process.env.DATABASE_URL);
  return sqlClient;
}

let ready;
// Creates the table on first use and loads the 43 starting profiles if it's empty.
export function ensureReady() {
  if (!ready) {
    ready = (async () => {
      const q = sql();
      await q`CREATE TABLE IF NOT EXISTS profiles (
        id text PRIMARY KEY,
        name text NOT NULL,
        sort_order integer NOT NULL DEFAULT 0,
        fields jsonb NOT NULL DEFAULT '{}'::jsonb,
        logo text,
        updated_at timestamptz NOT NULL DEFAULT now()
      )`;
      const [{ n }] = await q`SELECT count(*)::int AS n FROM profiles`;
      if (n === 0) {
        for (const p of seed) {
          await q`INSERT INTO profiles (id, name, sort_order, fields, logo)
                  VALUES (${p.id}, ${p.name}, ${p.order}, ${JSON.stringify(p.fields)}::jsonb, ${p.logo || null})
                  ON CONFLICT (id) DO NOTHING`;
        }
      }
    })().catch((e) => { ready = undefined; throw e; });
  }
  return ready;
}
