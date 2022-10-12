import type { VercelRequest, VercelResponse } from '@vercel/node';
import { toString } from 'qrcode'

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async (req: VercelRequest, res: VercelResponse) => {
  
  const { url } = JSON.parse(req.body)

  const svgQR = await toString(url, {
    type: 'svg',
    color: {
      dark: '#FFF',
      light: '#0000'
    }
  })

  return res.json({ svg: svgQR })
};