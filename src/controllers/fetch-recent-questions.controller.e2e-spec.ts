import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { title } from 'process'
import request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'

describe('Fetch recent questions (E2E)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()
		prisma = moduleRef.get(PrismaService)
		jwt = moduleRef.get(JwtService)

		await app.init()
	})

	test('[GET] /questions', async () => {
		const user = await prisma.user.create({
			data: {
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: '123456',
			},
		})

		const accessToken = jwt.sign({ sub: user.id })

		await prisma.question.createMany({
			data: [
				{
					title: 'Test question1',
					content: 'This is a test question1',
					slug: 'Test question1',
					authorId: user.id,
				},
				{
					title: 'Test question2',
					content: 'This is a test question2',
					slug: 'Test question2',
					authorId: user.id,
				},
				{
					title: 'Test question3',
					content: 'This is a test question3',
					slug: 'Test question3',
					authorId: user.id,
				},
			],
		})

		const response = await request(app.getHttpServer())
			.get('/questions')
			.set('Authorization', `Bearer ${accessToken}`)
			.send()

		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			questions: [
				expect.objectContaining({
					title: 'Test question1',
				}),
				expect.objectContaining({
					title: 'Test question2',
				}),
				expect.objectContaining({
					title: 'Test question3',
				}),
			],
		})
	})
})
