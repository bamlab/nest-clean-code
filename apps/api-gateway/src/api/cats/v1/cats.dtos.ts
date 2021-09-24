import { ApiProperty } from '@nestjs/swagger';

export class CatListResponseDto {
  @ApiProperty()
  items: string[];
  @ApiProperty()
  metadata: {
    count: number;
  };
}
