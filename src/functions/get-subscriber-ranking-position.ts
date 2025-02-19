import { redis } from '../redis/client'

interface GetSusbscriberRankingPositionParams {
  subscriberId: string
}

export async function getSusbscriberRankingPosition({
  subscriberId,
}: GetSusbscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
