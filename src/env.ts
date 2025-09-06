import z from 'zod'

export const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.coerce.number().optional().default(3333),
	DATABASE_URL: z.url(),
	JWT_SECRET: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>
