import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
} from '@nestjs/common';
import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { ChallengeService } from './service';

@Controller('challenges')
export class ChallengeController {
  constructor(private readonly service: ChallengeService) {}

  @Get()
  async index(@Response() res: any, @Query() query) {
    const sort = {};

    query.sort
      ? (sort[JSON.parse(query.sort)[0]] =
          JSON.parse(query.sort)[1] === 'ASC' ? 1 : -1)
      : null;
    const range = query.range ? JSON.parse(query.range) : [0, 10];
    const [rangeStart, rangeEnd] = [...range];
    const limit = rangeEnd - rangeStart + 1;
    const skip = rangeStart;
    const filter = query.filter ? JSON.parse(query.filter) : {};
    const result = await this.service.findAll(filter, sort, skip, limit);
    return res
      .set({
        'Content-Range': result.count,
        'Access-Control-Expose-Headers': 'Content-Range',
      })
      .json(result.data);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.service.create(createChallengeDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return await this.service.update(id, updateChallengeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
