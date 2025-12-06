import { Controller, Get, Post, Put, Delete, Param, Body,UseGuards } from '@nestjs/common';
import { TeamsService } from '../services/teams/teams.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.teamsService.create(dto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teamsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTeamDto) {
    return this.teamsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teamsService.remove(id);
  }
}