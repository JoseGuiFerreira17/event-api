import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSusbscriberInviteCount } from '../functions/get-subscriber-invite-count'
import { getSusbscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const getSusbscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/position',
      {
        schema: {
          summary:
            'Get the position of a subscriber based on the number of referrals',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { position } = await getSusbscriberRankingPosition({
          subscriberId,
        })

        return { position }
      }
    )
  }
