import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSusbscriberInviteCount } from '../functions/get-subscriber-invite-count'

export const getSusbscriberInviteCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking',
      {
        schema: {
          summary:
            'Get the ranking of a subscriber based on the number of referrals',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSusbscriberInviteCount({ subscriberId })

        return { count }
      }
    )
  }
