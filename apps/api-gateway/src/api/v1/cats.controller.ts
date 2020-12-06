// Import from "nest"
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

// Import from "fp"
import { executeTask } from '@utils';
import { pipe } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/TaskEither';

// Import from "libs" and "core"
import { CatPresenter } from 'libs/lib-cats/src/infra/presenter/cats.presenter';

// Import from "api-gateway"
import { CatListResponseDto } from '@app/api-gateway/api/dtos/cats.dtos';

@ApiTags('Cats')
@Controller()
export class CatsAPIControllerV1 {
  constructor(private readonly catsController: CatPresenter) {}

  @Get('cats')
  @ApiOperation({
    summary: 'Get all cats',
  })
  @ApiOkResponse({ description: 'All cats', type: CatListResponseDto })
  async listCats(): Promise<CatListResponseDto> {
    const task = pipe(
      this.catsController.listAllCats(),
      map((cats) => ({ items: cats, metadata: { count: cats.length } })),
    );
    return executeTask(task);
  }
}
