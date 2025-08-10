/** biome-ignore-all lint/style/useImportType: NestJS requires a real import at runtime to reflect the type and resolve dependency injection */
import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private prisma: PrismaService
	) {}

	@Get('/health')
	getHello(): string {
		return this.appService.getHello()
	}

	@Post('/users')
	async store() {
		return await this.prisma.user.findMany()
	}
}
