import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteSharedEmails1734372265360 implements MigrationInterface {
    name = 'DeleteSharedEmails1734372265360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "shared_mails"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" ADD "shared_mails" text array`);
    }

}
