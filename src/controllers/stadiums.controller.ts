import { Controller, Get, Post, Put, Delete, Param, Body,UseGuards } from '@nestjs/common';
import { StadiumsService } from '../services/stadiums/stadiums.service';
import { CreateStadiumDto } from '../dtos/create-stadium.dto';
import { UpdateStadiumDto } from '../dtos/update-stadium.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @Post()
  create(@Body() dto: CreateStadiumDto) {
    return this.stadiumsService.create(dto);
  }

  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stadiumsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stadiumsService.remove(id);
  }
}