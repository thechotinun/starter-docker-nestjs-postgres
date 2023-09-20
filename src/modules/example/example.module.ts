import { Module } from '@nestjs/common';
import { ExampleService as BackendExampleService } from './services/backend/example.service';
import { ExampleRepository } from '@repositories/example.repository';
import { ExampleController as BackendExampleController } from './controllers/backend/example.controller';

@Module({
  imports: [],
  controllers: [BackendExampleController],
  providers: [BackendExampleService, ExampleRepository],
})
export class ExampleModule {}
