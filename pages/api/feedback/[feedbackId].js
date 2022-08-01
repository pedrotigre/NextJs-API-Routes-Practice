import { getFeedbackPath, getFileData } from './index';

async function handler(req, res) {
  if (req.method === 'GET') {
    const filePath = getFeedbackPath();
    const data = await getFileData(filePath);
    const feedback = data.find((item) => item.id === req.query.feedbackId);
    res.status(200).json({ feedback });
  }
}

export default handler;
