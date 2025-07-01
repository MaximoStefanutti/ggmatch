import { Game } from 'src/games/entities/game.entity';
import { RankCategory } from 'src/rank/entities/rank.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Availability } from './availability.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  bio?: string;

  @Column({ type: 'varchar', length: 20 })
  platform: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToMany(() => Game, (game) => game.players)
  @JoinTable()
  games: Game[];

  @ManyToMany(() => RankCategory, (category) => category.users)
  rankCategory: RankCategory[];

  @OneToMany(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Availability, (availability) => availability.user, {
    cascade: true,
  })
  availabilities: Availability[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
