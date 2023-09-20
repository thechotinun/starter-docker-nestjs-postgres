import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { OauthUser } from '@entities/o-auth-user.entity';

@Injectable()
export class OauthUserRepository extends BaseRepository<OauthUser> {
  constructor(private dataSource: DataSource) {
    super(OauthUser, dataSource.createEntityManager());
  }
}
