import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../../models/club.model';
import { CreateClubDto } from '../../dtos/create-club.dto';
import { UpdateClubDto } from '../../dtos/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,
  ) {}

  async create(dto: CreateClubDto): Promise<Club> {
    const club = this.clubRepo.create(dto);
    return this.clubRepo.save(club);
  }

  async findAll(): Promise<Club[]> {
    return this.clubRepo.find({ relations: ['teams'] });
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.clubRepo.findOne({ where: { id }, relations: ['teams'] });
    if (!club) throw new NotFoundException(`Club ${id} not found`);
    return club;
  }

  async update(id: number, dto: UpdateClubDto): Promise<Club> {
    const updated = await this.clubRepo.preload({ id, ...dto });
    if (!updated) throw new NotFoundException(`Club ${id} not found`);
    return this.clubRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const club = await this.findOne(id);
    await this.clubRepo.remove(club);
  }
}