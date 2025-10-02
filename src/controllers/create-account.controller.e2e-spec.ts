import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'

describe('Create account (E2E)', () => {
	let app: INestApplication
	let prisma: PrismaService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()
		prisma = moduleRef.get(PrismaService)

		prisma = moduleRef.get(PrismaService)

		await app.init()
	})

	test('[POST] /accounts', async () => {
		const response = await request(app.getHttpServer()).post('/accounts').send({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'strongPassword123',
		})

		expect(response.status).toBe(201)

		const userOnDatabase = await prisma.user.findUnique({
			where: {
				email: 'john.doe@example.com',
			},
		})

		expect(userOnDatabase).toBeTruthy()
	})
})
