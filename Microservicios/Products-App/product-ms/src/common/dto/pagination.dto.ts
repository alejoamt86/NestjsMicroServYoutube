import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './pagination.constants';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = DEFAULT_PAGE;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = DEFAULT_LIMIT;
}
