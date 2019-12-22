import {
  Controller,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Post,
  Param,
  Request,
} from '@nestjs/common';
import * as requestIp from 'request-ip';

import { EventsService } from './events.service';
import { EventInfo } from '../interfaces';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/create')
  createEvent(@Body() body: EventInfo, @Request() request): number {
    if (!body) {
      throw new HttpException('Missed body content', HttpStatus.FORBIDDEN);
    }

    this.eventsService.createEvent(body, requestIp.getClientIp(request));
    return 1;
  }

  @Get('/list')
  allEvents(): Promise<EventInfo[]> {
    return this.eventsService.allEvents();
  }

  @Get('/pageid/:id')
  filterByPageID(@Param() params): Promise<EventInfo[]> {
    if (!params.id) {
      throw new HttpException('Missed id', HttpStatus.FORBIDDEN);
    }
    return this.eventsService.filterByPageID(params.id);
  }

  @Get('/browser/:str')
  filterByBrowser(@Param() params): Promise<EventInfo[]> {
    if (!params.str) {
      throw new HttpException('Missed id', HttpStatus.FORBIDDEN);
    }
    return this.eventsService.filterByBrowser(params.str);
  }

  @Get('/country')
  filterByCountry(): Promise<EventInfo[]> {
    return this.eventsService.filterByCountry();
  }

  @Get('/usercountry')
  filterByUserCountry(
    @Param() params,
    @Request() request,
  ): Promise<EventInfo[]> {
    return this.eventsService.filterByUserCountry(
      requestIp.getClientIp(request),
    );
  }

  @Get('/retusers')
  filterByReturningUsers(): Promise<EventInfo[]> {
    return this.eventsService.filterByReturningUsers();
  }
}
