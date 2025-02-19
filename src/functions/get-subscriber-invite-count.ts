import { redis } from '../redis/client'

interface getSusbscriberInviteCountParams {
  subscriberId: string
}

export async function getSusbscriberInviteCount({
  subscriberId,
}: getSusbscriberInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
