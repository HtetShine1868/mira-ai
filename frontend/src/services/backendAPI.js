// ─── Backend API Connector ────────────────────────────────────────────────────
// Connects to the Express backend running on port 5000.
// Falls back gracefully to null (caller will use mock AI instead).

export async function analyzeWithBackend(imageFile) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) return null;

    const json = await response.json();
    if (!json.success || !json.data) return null;

    const data = json.data;

    // Determine scenario type for chat responses
    const scenarioType = data.isSafe ? 'safe'
      : (data.riskLevel === 'Critical' || data.riskLevel === 'High') ? 'danger'
      : 'warning';

    // Normalise to our internal result shape
    return {
      ...data,
      scenarioType,
      miraMessage: data.isSafe
        ? '✅ Everything looks good here! This seems safe.'
        : data.riskLevel === 'Critical'
          ? '⚠️ Wait — this looks really risky. Click me so I can explain what I found.'
          : '🤔 Hmm, something doesn\'t look quite right here. Click me to find out more.',
    };
  } catch {
    // Network error or timeout — return null to trigger mock fallback
    return null;
  }
}
