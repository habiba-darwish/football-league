import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../../models/team.model';
import { CreateTeamDto } from '../../dtos/create-team.dto';
import { UpdateTeamDto } from '../../dtos/update-team.dto';
import { Club } from '../../models/club.model';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) {}

  // ✅ Create
  async create(dto: CreateTeamDto): Promise<Team> {
    const team = this.teamRepo.create({
      name: dto.name,
      coachName: dto.coachName,
      club: { id: dto.clubId } as Club,
    });
    return this.teamRepo.save(team);
  }

  // ✅ Read all
  async findAll(): Promise<Team[]> {
    return this.teamRepo.find({ relations: ['club', 'players', 'homeMatches', 'awayMatches'] });
  }

  // ✅ Read one
  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepo.findOne({
      where: { id },
      relations: ['club', 'players', 'homeMatches', 'awayMatches'],
    });
    if (!team) throw new NotFoundException(`Team ${id} not found`);
    return team;
  }

  // ✅ Update
  async update(id: number, dto: UpdateTeamDto): Promise<Team> {
    const updated = await this.teamRepo.preload({
      id,
      name: dto.name,
      coachName: dto.coachName,
      club: dto.clubId ? ({ id: dto.clubId } as Club) : undefined,
    });
    if (!updated) throw new NotFoundException(`Team ${id} not found`);
    return this.teamRepo.save(updated);
  }

  // ✅ Delete
  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepo.remove(team);
  }
}