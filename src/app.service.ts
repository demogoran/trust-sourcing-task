import { Injectable } from '@nestjs/common';
import { PageInfo, EventInfo } from './interfaces';

@Injectable()
export class AppService {
  getPageContent(id): PageInfo {
    return {
      id,
      name: 'qwe',
      visitTime: Date.now(),
    };
  }

  getAllPages(): PageInfo[] {
    return [
      {
        id: 1,
        name: 'Main',
      },
      {
        id: 2,
        name: 'Secondary',
      },
      {
        id: 3,
        name: 'Third',
      },
    ];
  }
}
