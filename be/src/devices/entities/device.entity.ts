import { AbstractAuditingEntity } from "../../common/entities/abstract-auditing-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { DeviceLocationType } from "../types/location-device.type";
import { StateHistory } from "../../histories/entities/state-history.entity";

@Entity('devices')
export class DeviceEntity extends AbstractAuditingEntity {
  @Column({type: 'varchar', name: 'device_name', unique: true})
  deviceName: string;

  @Column({type: 'varchar', name: 'embed_id', unique: true})
  embedId: string;

  @Column({type: 'jsonb', nullable: true})
  location: DeviceLocationType;

  @OneToMany(() => StateHistory, (history) => history.device, {
    cascade: true,
    nullable: true
  })
  stateHistories: StateHistory[];
}