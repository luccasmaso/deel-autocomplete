import type { NextApiRequest, NextApiResponse } from 'next'

import topAlbums from "./top-albums.json"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {

  res.status(200).json(topAlbums)
}