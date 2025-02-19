import { redis } from '../redis/client'

interface getSusbscriberInviteClicksParams {
  subscriberId: string
}

export async function getSusbscriberInviteClicks({
  subscriberId,
}: getSusbscriberInviteClicksParams) {
  const clicks = await redis.hget('referral:access-count', subscriberId)

  return { count: clicks ? Number.parseInt(clicks) : 0 }
}
