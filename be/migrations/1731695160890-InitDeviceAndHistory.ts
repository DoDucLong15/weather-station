import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDeviceAndHistory1731695160890 implements MigrationInterface {
    name = 'InitDeviceAndHistory1731695160890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "devices" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "device_name" character varying NOT NULL, "embed_id" character varying NOT NULL, "location" jsonb, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state-history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "time" character varying NOT NULL, "temperature" double precision NOT NULL, "humidity" double precision NOT NULL, "device_id" integer, CONSTRAINT "PK_1731805810506241ff5c8717c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state-history" ADD CONSTRAINT "FK_4e67370ae855c2b8936098889f2" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "state-history" DROP CONSTRAINT "FK_4e67370ae855c2b8936098889f2"`);
        await queryRunner.query(`DROP TABLE "state-history"`);
        await queryRunner.query(`DROP TABLE "devices"`);
    }

}
