import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stadium } from '../../models/stadium.model';
import { CreateStadiumDto } from '../../dtos/create-stadium.dto';
import { UpdateStadiumDto } from '../../dtos/update-stadium.dto';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectRepository(Stadium)
    private readonly stadiumRepo: Repository<Stadium>,
  ) {}

  async create(dto: CreateStadiumDto): Promise<Stadium> {
    const stadium = this.stadiumRepo.create(dto);
    return this.stadiumRepo.save(stadium);
  }

  async findAll(): Promise<Stadium[]> {
    return this.stadiumRepo.find({ relations: ['matches'] });
  }

  async findOne(id: number): Promise<Stadium> {
    const stadium = await this.stadiumRepo.findOne({ where: { id }, relations: ['matches'] });
    if (!stadium) throw new NotFoundException(`Stadium ${id} not found`);
    return stadium;
  }

  async update(id: number, dto: UpdateStadiumDto): Promise<Stadium> {
    const updated = await this.stadiumRepo.preload({ id, ...dto });
    if (!updated) throw new NotFoundException(`Stadium ${id} not found`);
    return this.stadiumRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const stadium = await this.findOne(id);
    await this.stadiumRepo.remove(stadium);
  }
}