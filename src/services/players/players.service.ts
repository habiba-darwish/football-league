import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../models/player.model';
import { CreatePlayerDto } from '../../dtos/create-player.dto';
import { UpdatePlayerDto } from '../../dtos/update-player.dto';
import { Team } from '../../models/team.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepo: Repository<Player>,
  ) {}

  async create(dto: CreatePlayerDto): Promise<Player> {
    const player = this.playerRepo.create({
      name: dto.name,
      position: dto.position,
      shirtNumber: dto.shirtNumber,  
      team: { id: dto.teamId } as Team,
    });
    return this.playerRepo.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepo.find({ relations: ['team'] });
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playerRepo.findOne({ where: { id }, relations: ['team'] });
    if (!player) throw new NotFoundException(`Player ${id} not found`);
    return player;
  }

  async update(id: number, dto: UpdatePlayerDto): Promise<Player> {
    const updated = await this.playerRepo.preload({
      id,
      name: dto.name,
      position: dto.position,
      team: dto.teamId ? ({ id: dto.teamId } as Team) : undefined,
    });
    if (!updated) throw new NotFoundException(`Player ${id} not found`);
    return this.playerRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const player = await this.findOne(id);
    await this.playerRepo.remove(player);
  }
}