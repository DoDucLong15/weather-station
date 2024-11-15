import { AbstractAuditingEntity } from "../../common/entities/abstract-auditing-entity";
import { DeviceEntity } from "../../devices/entities/device.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('state-history')
export class StateHistory extends AbstractAuditingEntity {
  @Column({type: 'varchar'})
  time: string;

  @Column({type: 'float'})
  temperature: number;

  @Column({type: 'float'})
  humidity: number;

  @ManyToOne(() => DeviceEntity, (device) => device.stateHistories, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'device_id'
  })
  device: DeviceEntity;
}