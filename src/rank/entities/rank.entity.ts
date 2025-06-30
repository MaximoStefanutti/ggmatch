import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rank_categories')
export class RankCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Game, (game) => game.rankCategories)
  game: Game;

  @OneToMany(() => User, (user) => user.rankCategory)
  users: User[];
}
