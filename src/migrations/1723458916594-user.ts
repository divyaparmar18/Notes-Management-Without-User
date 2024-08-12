import { MigrationInterface, QueryRunner } from "typeorm";

export class User1723458916594 implements MigrationInterface {
    name = 'User1723458916594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "note" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "isDeleted"`);
    }

}
