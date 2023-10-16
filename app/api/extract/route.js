import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { filename, fileContent } = req.body;
      const uniqueId = uuidv4();
      const filePath = path.join(
        process.cwd(),
        'public',
        'downloads',
        `${uniqueId}.txt`
      );

      fs.writeFileSync(filePath, fileContent.join('\n'));

      res
        .status(200)
        .json({ downloadUrl: `/downloads/${filename}${uniqueId}.txt` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
