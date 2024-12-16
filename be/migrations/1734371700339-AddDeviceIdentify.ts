import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeviceIdentify1734371700339 implements MigrationInterface {
    name = 'AddDeviceIdentify1734371700339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" ADD "owner" character varying`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "shared_mails" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "shared_mails"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "owner"`);
    }

}
