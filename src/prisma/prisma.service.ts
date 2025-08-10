import {
	Injectable,
	type OnModuleDestroy,
	type OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from 'generated/prisma'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({
			log: ['query', 'info', 'warn', 'error'],
		})
	}

	onModuleInit() {
		return this.$connect()
	}

	onModuleDestroy() {
		return this.$disconnect()
	}
}
