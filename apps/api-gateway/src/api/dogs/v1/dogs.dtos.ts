import { ApiProperty } from '@nestjs/swagger';

export class DogListResponseDto {
  @ApiProperty()
  items: string[];
  @ApiProperty()
  metadata: {
    count: number;
  };
}
