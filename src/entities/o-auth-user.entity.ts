import { v4 as uuidv4 } from 'uuid';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oAuthUser')
export class OauthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'uuid' })
  accessToken: string;

  @Column({ type: 'uuid' })
  refreshToken: string;

  @BeforeInsert()
  insertCreated() {
    this.refreshToken = uuidv4();
    this.accessToken = uuidv4();
  }
}
