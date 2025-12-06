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
import { PlayersService } from '../services/players/players.service';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() dto: CreatePlayerDto) {
    return this.playersService.create(dto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.playersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePlayerDto) {
    return this.playersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.playersService.remove(+id);
  }
}
