import { User } from 'src/users/entities/user.entity';
import { RankCategory } from 'src/rank/entities/rank.entity';

import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => RankCategory, (category) => category.game)
  rankCategories: RankCategory[];

  @OneToMany(() => Role, (role) => role.game)
  roles: Role[];

  @ManyToMany(() => User, (user) => user.games)
  players: User[];
}
