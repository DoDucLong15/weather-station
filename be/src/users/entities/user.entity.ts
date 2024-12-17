import { AbstractAuditingEntity } from "../../common/entities/abstract-auditing-entity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class UserEntity extends AbstractAuditingEntity {
  @Column({type: 'varchar', name: 'first_name', nullable: true})
  firstName: string;

  @Column({type: 'varchar', name: 'last_name', nullable: true})
  lastName: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar', name: 'encode_password'})
  encodePassword: string
}