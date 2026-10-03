import { MongoClient } from 'mongodb'
const MONGO_URL = process.env.MONGO_URL
let cachedClient = null
export async function getDb() {
  if (!MONGO_URL) throw new Error('MONGO_URL not configured')
  if (cachedClient) return cachedClient.db()
  const client = new MongoClient(MONGO_URL)
  await client.connect()
  cachedClient = client
  return client.db()
}
