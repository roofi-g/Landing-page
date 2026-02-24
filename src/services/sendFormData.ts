export async function sendFormData(data: { [k: string]: FormDataEntryValue; }) {
  const response = await fetch('/api/send', {
    method: 'POST',
    headers: { 
      'Content-Type': 
      'application/json' 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  try {
    return response.json();
  } catch {
    throw new Error('Invalid JSON from server');
  }
}