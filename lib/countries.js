// Country data for the contact form's optional phone field.
//
// Three separate pieces of information, kept in separate fields on purpose:
//   name  - display name
//   iso2  - ISO 3166-1 alpha-2 country code (identifies the country)
//   dial  - international dialing code (used only to build a phone number)
//
// Dialing codes are NOT unique per country (the US and Canada both use +1), so always
// identify a country by `iso2`, never by `dial`.
// To support another country, add one line here. Nothing else needs to change.

export const COUNTRIES = [
  { name: 'Nepal', iso2: 'NP', dial: '977' },
  { name: 'India', iso2: 'IN', dial: '91' },
  { name: 'Bangladesh', iso2: 'BD', dial: '880' },
  { name: 'Bhutan', iso2: 'BT', dial: '975' },
  { name: 'Sri Lanka', iso2: 'LK', dial: '94' },
  { name: 'Pakistan', iso2: 'PK', dial: '92' },
  { name: 'United Arab Emirates', iso2: 'AE', dial: '971' },
  { name: 'Singapore', iso2: 'SG', dial: '65' },
  { name: 'Australia', iso2: 'AU', dial: '61' },
  { name: 'United Kingdom', iso2: 'GB', dial: '44' },
  { name: 'United States', iso2: 'US', dial: '1' },
  { name: 'Canada', iso2: 'CA', dial: '1' },
  { name: 'Germany', iso2: 'DE', dial: '49' },
  { name: 'France', iso2: 'FR', dial: '33' },
  { name: 'Japan', iso2: 'JP', dial: '81' },
]

export const DEFAULT_COUNTRY_ISO2 = 'NP'

export function findCountry(iso2) {
  return COUNTRIES.find((c) => c.iso2 === iso2) || null
}

// Anything that is not a digit, space, dash, dot, parenthesis or a leading "+" is rejected by validation.
// E.164 allows at most 15 digits in total, including the country code.
export function buildPhone(iso2, nationalNumber) {
  const country = findCountry(iso2)
  if (!country) return { ok: false, error: 'Choose a valid country for the phone number.' }
  const raw = String(nationalNumber || '').trim()
  if (!/^[\d\s\-().]+$/.test(raw)) return { ok: false, error: 'Phone number can only contain digits, spaces and dashes.' }
  // Drop a leading trunk "0" (e.g. 098... in Nepal), which is not part of the international number.
  const digits = raw.replace(/\D/g, '').replace(/^0+/, '')
  if (digits.length < 6 || country.dial.length + digits.length > 15) {
    return { ok: false, error: `Enter a valid phone number for ${country.name}.` }
  }
  return { ok: true, e164: `+${country.dial}${digits}`, country }
}
