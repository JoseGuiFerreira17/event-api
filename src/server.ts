import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSusbscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSusbscriberInviteCountRoute } from './routes/get-subscriber-invite-count-route'
import { getSusbscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { subscripeToEventRoute } from './routes/subscripe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)

app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'My API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscripeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSusbscriberInviteClicksRoute)
app.register(getSusbscriberInviteCountRoute)
app.register(getSusbscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}`)
})
