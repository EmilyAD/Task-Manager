export const countryOptions = [
  { code: "+961", label: "Lebanon", key: "LB" },
  { code: "+1", label: "USA/Canada", key: "US" },
  { code: "+33", label: "France", key: "FR" },
  { code: "+49", label: "Germany", key: "DE" },
  { code: "+44", label: "UK", key: "UK" },
  { code: "+90", label: "Turkey", key: "TR" },
  { code: "+971", label: "UAE", key: "AE" },
  { code: "+966", label: "Saudi Arabia", key: "SA" },
  { code: "+20", label: "Egypt", key: "EG" },
  { code: "+962", label: "Jordan", key: "JO" },
  { code: "+974", label: "Qatar", key: "QA" },
  { code: "+965", label: "Kuwait", key: "KW" },
  { code: "+973", label: "Bahrain", key: "BH" },
  { code: "+968", label: "Oman", key: "OM" },
  { code: "+963", label: "Syria", key: "SY" },
  { code: "+964", label: "Iraq", key: "IQ" },
  { code: "+212", label: "Morocco", key: "MA" },
  { code: "+213", label: "Algeria", key: "DZ" },
  { code: "+216", label: "Tunisia", key: "TN" },
  { code: "+39", label: "Italy", key: "IT" },
  { code: "+34", label: "Spain", key: "ES" },
  { code: "+31", label: "Netherlands", key: "NL" },
  { code: "+32", label: "Belgium", key: "BE" },
  { code: "+61", label: "Australia", key: "AU" },
  { code: "+81", label: "Japan", key: "JP" },
  { code: "+82", label: "South Korea", key: "KR" },
  { code: "+91", label: "India", key: "IN" },
  { code: "+86", label: "China", key: "CN" },
  { code: "+55", label: "Brazil", key: "BR" },
  { code: "+27", label: "South Africa", key: "ZA" },
  { code: "+999", label: "Other", key: "OTHER" },
];

export function validateEmail(email) {
  const trimmed = email.trim();

  // simple but good client-side format validation
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  if (!trimmed) {
    return "Email is required.";
  }

  if (!emailRegex.test(trimmed)) {
    return "Enter a valid email.";
  }

  return "";
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must include at least 1 lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include at least 1 uppercase letter.";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must include at least 1 special character.";
  }

  return "";
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
}

export function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

export function validatePhone(countryKey, phone) {
  const cleaned = digitsOnly(phone);

  if (!cleaned) {
    return "Phone number is required.";
  }

  const validators = {
    LB: /^(\d{7,8})$/,       // Lebanon local numbers usually 7–8 digits after +961
    US: /^(\d{10})$/,        // USA/Canada
    FR: /^(\d{9})$/,         // France after +33
    DE: /^(\d{10,11})$/,     // Germany varies
    UK: /^(\d{10})$/,        // UK common local format after +44
    TR: /^(\d{10})$/,        // Turkey
    AE: /^(\d{9})$/,         // UAE
    SA: /^(\d{9})$/,         // Saudi
    EG: /^(\d{10})$/,        // Egypt
    JO: /^(\d{8,9})$/,       // Jordan
    QA: /^(\d{8})$/,
    KW: /^(\d{8})$/,
    BH: /^(\d{8})$/,
    OM: /^(\d{8})$/,
    SY: /^(\d{8,9})$/,
    IQ: /^(\d{9,10})$/,
    MA: /^(\d{9})$/,
    DZ: /^(\d{9})$/,
    TN: /^(\d{8})$/,
    IT: /^(\d{9,10})$/,
    ES: /^(\d{9})$/,
    NL: /^(\d{9})$/,
    BE: /^(\d{8,9})$/,
    AU: /^(\d{9})$/,
    JP: /^(\d{9,10})$/,
    KR: /^(\d{9,10})$/,
    IN: /^(\d{10})$/,
    CN: /^(\d{11})$/,
    BR: /^(\d{10,11})$/,
    ZA: /^(\d{9})$/,
    OTHER: /^(\d{6,15})$/,
  };

  const regex = validators[countryKey] || validators.OTHER;

  if (!regex.test(cleaned)) {
    return "Enter a valid phone number for the selected country.";
  }

  return "";
}
