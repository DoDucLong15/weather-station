import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSharedEmails1734372303327 implements MigrationInterface {
    name = 'AddSharedEmails1734372303327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" ADD "shared_mails" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "shared_mails"`);
    }

}
