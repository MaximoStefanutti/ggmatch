import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @ManyToOne(() => Game, (game) => game.roles, {
    onDelete: 'CASCADE',
  })
  game: Game;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
