import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import z from 'zod'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { PrismaService } from '@/prisma/prisma.service'

const pageQueryParamSchema = z.object({
	page: z
		.string()
		.optional()
		.default('1')
		.transform(Number)
		.pipe(z.number().min(1)),
	pageSize: z
		.string()
		.optional()
		.default('10')
		.transform(Number)
		.pipe(z.number().min(1)),
})

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
	constructor(private prisma: PrismaService) {}

	@Get()
	async handle(
		@Query(queryValidationPipe)
		query: PageQueryParamSchema
	) {
		const { page, pageSize } = query

		const questions = await this.prisma.question.findMany({
			take: pageSize,
			skip: (page - 1) * pageSize,
			orderBy: { createdAt: 'desc' },
		})

		return { questions }
	}
}
