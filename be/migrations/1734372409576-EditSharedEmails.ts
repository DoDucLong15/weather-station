import { MigrationInterface, QueryRunner } from "typeorm";

export class EditSharedEmails1734372409576 implements MigrationInterface {
    name = 'EditSharedEmails1734372409576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "shared_mails"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "shared_mails" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "shared_mails"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "shared_mails" text array`);
    }

}
