import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../../models/match.model';
import { CreateMatchDto } from '../../dtos/create-match.dto';
import { UpdateMatchDto } from '../../dtos/update-match.dto';
import { Team } from 'src/models/team.model';
import { Stadium } from 'src/models/stadium.model';
import { checkMatchConflict } from '../../utils/match-conflict.utils';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  async create(dto: CreateMatchDto): Promise<Match> {
    await checkMatchConflict(this.matchRepo, dto.stadium, dto.date);

    const match = this.matchRepo.create({
      date: new Date(dto.date),
      homeTeam: { id: dto.homeTeam } as Team,
      awayTeam: { id: dto.awayTeam } as Team,
      stadium: { id: dto.stadium } as Stadium,
    });

    return this.matchRepo.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepo.find({
      relations: ['homeTeam', 'awayTeam', 'stadium'],
    });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepo.findOne({
      where: { id },
      relations: ['homeTeam', 'awayTeam', 'stadium'], 
    });
    if (!match) throw new NotFoundException(`Match ${id} not found`);
    return match;
  }

  async update(id: number, dto: UpdateMatchDto): Promise<Match> {
    if (dto.stadium && dto.date) {
      await checkMatchConflict(this.matchRepo, dto.stadium, dto.date, id);
    }

    const updated = await this.matchRepo.preload({
      id,
      date: dto.date ? new Date(dto.date) : undefined,
      homeTeam: dto.homeTeam ? ({ id: dto.homeTeam } as Team) : undefined,
      awayTeam: dto.awayTeam ? ({ id: dto.awayTeam } as Team) : undefined,
      stadium: dto.stadium ? ({ id: dto.stadium } as Stadium) : undefined,
      scoreHome: dto.scoreHome,
      scoreAway: dto.scoreAway,
    });

    if (!updated) throw new NotFoundException(`Match ${id} not found`);
    return this.matchRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.matchRepo.delete(id);
  }
}
