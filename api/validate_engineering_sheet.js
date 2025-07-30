export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { sheet_text, system_type, voltage_level } = req.body;

  const violations = [];
  const suggestions = [];

  if (sheet_text.includes("10 AWG") && sheet_text.includes("40A")) {
    violations.push({
      issue: "OCPD exceeds ampacity of 10 AWG CU",
      code_ref: "NEC 240.4(D)"
    });
    suggestions.push("Reduce breaker to 30A or upsize to 8 AWG CU");
  }

  res.json({
    status: violations.length ? "fail" : "pass",
    violations,
    suggestions
  });
}
