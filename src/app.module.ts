import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { databaseConfig } from './config/database.config';
import { jwtConstants } from './config/jwt.config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigModule , ConfigService } from '@nestjs/config';


import * as bcrypt from 'bcrypt';

// Controllers
import { AppController } from './app.controller';
import { AuthController } from './controllers/auth.controller';
import { MatchesController } from './controllers/matches.controller';
import { PlayersController } from './controllers/players.controller';
import { StadiumsController } from './controllers/stadiums.controller';
import { TeamsController } from './controllers/teams.controller';

// Services
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { MatchesService } from './services/matches/matches.service';
import { PlayersService } from './services/players/players.service';
import { StadiumsService } from './services/stadiums/stadiums.service';
import { TeamsService } from './services/teams/teams.service';
import { ClubsService } from './services/clubs/clubs.service';

// Entities
import { User } from './models/user.model';
import { Match } from './models/match.model';
import { Player } from './models/player.model';
import { Stadium } from './models/stadium.model';
import { Team } from './models/team.model';
import { Club } from './models/club.model';
import { SampleEnum } from './models/user.model';
import { ClubsController } from './controllers/clubs.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, Match, Player, Stadium, Team, Club]), // 👈 register all entities
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    MatchesController,
    PlayersController,
    StadiumsController,
    TeamsController,
    ClubsController
  ],
  providers: [
    AppService,
    AuthService,
    MatchesService,
    PlayersService,
    StadiumsService,
    TeamsService,
    ClubsService
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userRepo.findOne({
      where: { role: SampleEnum.ONE },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
      const admin = this.userRepo.create({
        userName: process.env.ADMIN_USERNAME,
        password: hashedPassword,
        role: SampleEnum.ONE,
      });
      await this.userRepo.save(admin);
      console.log('✅ Admin user created at startup with hashed password');
    }
    
  }
}