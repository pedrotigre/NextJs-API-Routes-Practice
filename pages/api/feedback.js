import fs from 'fs/promises';
import path from 'path';

async function handler(req, res) {
  if (req.method === 'POST') {
    const newFeedback = {
      id: new Date().toISOString(),
      email: req.body.email,
      text: req.body.text,
    };
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = JSON.parse(await fs.readFile(filePath));
    fileData.push(newFeedback);
    const fileWrite = await fs.writeFile(filePath, JSON.stringify(fileData));
    return res.status(201).json({ message: 'Feedback received!' });
  }
  return res.status(200).json({ message: 'Success!' });
}
export default handler;
