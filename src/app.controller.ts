import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PageInfo } from './interfaces';
import { EventInfo } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllPages(@Param() params): PageInfo[] {
    return this.appService.getAllPages();
  }

  @Get('/page/:id')
  getPageContent(@Param() params): PageInfo | PageInfo[] {
    const { id } = params;
    if (+id === 0) {
      return this.appService.getAllPages();
    }

    if (!id) {
      throw new HttpException('Please specify page ID', HttpStatus.FORBIDDEN);
    }
    return this.appService.getPageContent(id);
  }
}
