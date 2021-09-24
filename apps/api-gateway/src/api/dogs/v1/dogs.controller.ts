// Import from "nest"
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

// Import from "libs" and "core"
import { DogPresenter } from 'libs/lib-dogs/src/infra/presenter/dogs.presenter';

// Import from "api-gateway"
import { DogListResponseDto } from '@app/api-gateway/api/dogs/v1/dogs.dtos';

@ApiTags('Dogs')
@Controller()
export class DogsAPIControllerV1 {
  constructor(private readonly dogsController: DogPresenter) {}

  @Get('dogs')
  @ApiOperation({
    summary: 'Get all dogs',
  })
  @ApiOkResponse({ description: 'All dogs', type: DogListResponseDto })
  async listDogs(): Promise<DogListResponseDto> {
    const dogs = await this.dogsController.listAllDogs();
    return { items: dogs, metadata: { count: dogs.length } };
  }
}
