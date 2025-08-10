import { Controller, Get } from '@nestjs/common'
// biome-ignore lint/style/useImportType: NestJS requires a real import at runtime to reflect the type and resolve dependency injection
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/health')
	getHello(): string {
		return this.appService.getHello()
	}
}
