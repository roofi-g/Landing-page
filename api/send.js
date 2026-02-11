/**
 *
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing env vars:', { 
        hasToken: !!BOT_TOKEN, 
        hasChatId: !!CHAT_ID 
      });
      return res.status(500).json({ 
        error: "Server configuration error",
        details: "Missing Telegram credentials" 
      });
    }

    const { name, email, message } = req.body;
    const text = `Новая заявка
        Имя: ${name || 'не указано'}
        Email: ${email || 'не указан'}
        Сообщение: ${message || 'не указано'}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    const tgText = await tgRes.text();
    console.log('Telegram response:', tgRes.status, tgText);

    if (!tgRes.ok) {
      return res.status(500).json({ error: "Telegram API error", details: tgText });
    }

    return res.status(200).json({ ok: true, message: "Sent successfully" });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ 
      error: "Send failed", 
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}