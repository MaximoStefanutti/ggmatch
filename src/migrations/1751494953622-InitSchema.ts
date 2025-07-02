import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751494953622 implements MigrationInterface {
    name = 'InitSchema1751494953622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rank_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "order" integer NOT NULL, "gameId" uuid, CONSTRAINT "PK_46ebbcf496aea3f7cb8111df942" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "gameId" uuid, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_28639e6be5f363b0257ec04e14f" UNIQUE ("name"), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "availabilities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day" character varying(15) NOT NULL, "startTime" character varying(5) NOT NULL, "endTime" character varying(5) NOT NULL, "userId" uuid, CONSTRAINT "PK_9562bd8681d40361b1a124ea52c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "username" character varying(50), "bio" character varying(200), "platform" character varying(20) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdmin" boolean NOT NULL DEFAULT false, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_games_games" ("usersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_cd4067d574477fd5c7693bc7872" PRIMARY KEY ("usersId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e5263d029d8644de829aae5c35" ON "users_games_games" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_934b0d8f9d0084c97d3876ad32" ON "users_games_games" ("gamesId") `);
        await queryRunner.query(`ALTER TABLE "rank_categories" ADD CONSTRAINT "FK_0e6f8c91e2d97c1d0e3a407096a" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_8b9d4da01bc2bda62f2ca6a781f" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availabilities" ADD CONSTRAINT "FK_4cf4c255dc6d83b9e978a5ab0a0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_e5263d029d8644de829aae5c35a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"`);
        await queryRunner.query(`ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_e5263d029d8644de829aae5c35a"`);
        await queryRunner.query(`ALTER TABLE "availabilities" DROP CONSTRAINT "FK_4cf4c255dc6d83b9e978a5ab0a0"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_8b9d4da01bc2bda62f2ca6a781f"`);
        await queryRunner.query(`ALTER TABLE "rank_categories" DROP CONSTRAINT "FK_0e6f8c91e2d97c1d0e3a407096a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_934b0d8f9d0084c97d3876ad32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5263d029d8644de829aae5c35"`);
        await queryRunner.query(`DROP TABLE "users_games_games"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "availabilities"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "rank_categories"`);
    }

}
