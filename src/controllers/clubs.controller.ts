import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { ClubsService } from '../services/clubs/clubs.service';
import { CreateClubDto } from '../dtos/create-club.dto';
import { UpdateClubDto } from '../dtos/update-club.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  create(@Body() dto: CreateClubDto) {
    return this.clubsService.create(dto);
  }

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clubsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClubDto) {
    return this.clubsService.update(+id, dto); 
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clubsService.remove(id);
  }
}
