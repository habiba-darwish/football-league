import { Repository } from 'typeorm';
import { Match } from '../models/match.model';
import { BadRequestException } from '@nestjs/common';

export async function checkMatchConflict(
  matchRepo: Repository<Match>,
  stadiumId: number,
  matchDate: string,
  excludeMatchId?: number, 
): Promise<void> {
  const newDate = new Date(matchDate);

  const existingMatches = await matchRepo.find({
    where: { stadium: { id: stadiumId } },
  });

  for (const match of existingMatches) {
    if (excludeMatchId && match.id === excludeMatchId) continue;

    const existingDate = new Date(match.date);
    const diffMinutes = Math.abs((newDate.getTime() - existingDate.getTime()) / (1000 * 60));

    if (diffMinutes < 120) {
      throw new BadRequestException(
        `Conflict: Stadium already has a match scheduled at ${existingDate.toISOString()} (within 120 minutes).`,
      );
    }
  }
}