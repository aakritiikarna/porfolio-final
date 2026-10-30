// Small in-memory rate limiter for the contact form (basic spam protection).
// Limitation: state lives in one server process. On serverless hosts (e.g. Vercel) each instance has its own
// counter, so this slows spam down but does not stop a determined attacker. Add a CAPTCHA (Cloudflare Turnstile,
// hCaptcha) or an edge/WAF rate limit if spam becomes a problem.

const hits = new Map()

export function rateLimit(key, { limit = 5, windowMs = 15 * 60 * 1000 } = {}) {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return { allowed: false, retryAfterSec: Math.ceil((windowMs - (now - recent[0])) / 1000) }
  }
  recent.push(now)
  hits.set(key, recent)
  // Keep the map from growing forever.
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  return { allowed: true }
}
