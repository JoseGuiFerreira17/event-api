import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const existingSubscriber = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (existingSubscriber.length > 0) {
    return { subscriberId: existingSubscriber[0].id }
  }

  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  return {
    subscriberId: result[0].id,
  }
}
