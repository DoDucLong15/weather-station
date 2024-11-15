import { MigrationInterface, QueryRunner } from "typeorm";

export class ConstraintDevice1731695852788 implements MigrationInterface {
    name = 'ConstraintDevice1731695852788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "UQ_cd694240ae46fb296e6b6a9627c" UNIQUE ("device_name")`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "UQ_e7cfe70b764a2f52a1ff63dd11c" UNIQUE ("embed_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "UQ_e7cfe70b764a2f52a1ff63dd11c"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "UQ_cd694240ae46fb296e6b6a9627c"`);
    }

}
