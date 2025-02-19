import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { getSusbscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const getSusbscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/count',
      {
        schema: {
          summary:
            'Get the number of times a subscriber has accessed the invite link',
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

        const { count } = await getSusbscriberInviteClicks({ subscriberId })

        return { count }
      }
    )
  }
