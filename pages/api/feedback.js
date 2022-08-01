import fs from 'fs/promises';
import path from 'path';

export function getFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}
export async function getFileData(path) {
  return JSON.parse(await fs.readFile(path));
}

async function setFeedbackData(path, newData) {
  return fs.writeFile(path, JSON.stringify(newData));
}

async function handler(req, res) {
  // New feedback structure
  const newFeedback = {
    id: new Date().toISOString(),
    email: req.body.email,
    text: req.body.text,
  };

  // Get feedback path
  const filePath = getFeedbackPath();
  // Get the data stored on feedback.json (an array)
  const data = await getFileData(filePath);

  if (req.method === 'POST') {
    //  Add new feedback by pushing it to the data array.
    data.push(newFeedback);
    // Update feedback.json with the new data
    await setFeedbackData(filePath, data);

    return res.status(201).json({ message: 'Feedback received!' });
  }
  if (req.method === 'GET') {
    return res.status(200).json({ feedback: data });
  }
}
export default handler;
