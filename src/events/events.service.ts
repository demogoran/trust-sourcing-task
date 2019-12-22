import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as geoip from 'geoip-lite';

import { Event } from '../entities/events.entity';
import { EventInfo } from '../interfaces';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async createEvent(event: EventInfo, ip: string): Promise<void> {
    const { eventtype, pageid, userid, timestamp, browser } = event;
    const newEvent = { eventtype, pageid, userid, timestamp, browser };

    const geo = geoip.lookup(ip); // couldn't work on localhost

    await this.eventsRepository.save({
      ...event,
      country: geo ? geo.country : 'No country',
    });
  }

  async allEvents(): Promise<any> {
    const data = await this.eventsRepository.find({});
    return {
      columns: [
        { label: 'id', field: 'id' },
        { label: 'eventtype', field: 'eventtype' },
        { label: 'pageid', field: 'pageid' },
        { label: 'userid', field: 'userid' },
        { label: 'timestamp', field: 'timestamp' },
        { label: 'browser', field: 'browser' },
        { label: 'country', field: 'country' },
      ],
      data,
    };
  }

  async filterByPageID(pageid): Promise<any> {
    const data = await this.eventsRepository.find({
      pageid: +pageid,
    });
    return {
      columns: [
        { label: 'id', field: 'id' },
        { label: 'eventtype', field: 'eventtype' },
        { label: 'pageid', field: 'pageid' },
        { label: 'userid', field: 'userid' },
        { label: 'timestamp', field: 'timestamp' },
        { label: 'browser', field: 'browser' },
        { label: 'country', field: 'country' },
      ],
      data,
    };
  }

  async filterByBrowser(str): Promise<any> {
    const data = await this.eventsRepository.find({});
    const filtered = data.filter(
      x => (x.browser || '').toLowerCase().indexOf(str.toLowerCase()) > -1,
    );

    return {
      columns: [
        { label: 'id', field: 'id' },
        { label: 'eventtype', field: 'eventtype' },
        { label: 'pageid', field: 'pageid' },
        { label: 'userid', field: 'userid' },
        { label: 'timestamp', field: 'timestamp' },
        { label: 'browser', field: 'browser' },
        { label: 'country', field: 'country' },
      ],
      data: filtered,
    };
  }

  async filterByCountry(str): Promise<any> {
    const data = await this.eventsRepository.find({});
    const countries = {};
    data.forEach(x => (countries[x.country] = (countries[x.country] || 0) + 1));

    const result = Object.keys(countries).map(x => ({
      country: x,
      views: countries[x],
    }));

    return {
      columns: [
        { label: 'country', field: 'country' },
        { label: 'views', field: 'views' },
      ],
      data: result,
    };
  }

  async filterByUserCountry(ip): Promise<any> {
    const geo = geoip.lookup(ip); // couldn't work on localhost

    const data = await this.eventsRepository.find({
      country: geo ? geo.country : 'No country',
    });
    const countries = {};
    data.forEach(x => (countries[x.country] = (countries[x.country] || 0) + 1));

    const result = Object.keys(countries).map(x => ({
      country: x,
      views: countries[x],
    }));

    return {
      columns: [
        { label: 'country', field: 'country' },
        { label: 'views', field: 'views' },
      ],
      data: result,
    };
  }

  async filterByReturningUsers(): Promise<any> {
    const data = await this.eventsRepository.find({});
    const users = {};
    data.forEach(x => (users[x.userid] = (users[x.userid] || 0) + 1));

    const usersKeys = Object.keys(users);
    const onceVisitedCount = usersKeys.filter(x => users[x] === 1).length;

    const rate = (1 - onceVisitedCount / usersKeys.length).toFixed(2);
    console.log(onceVisitedCount, usersKeys.length, rate);

    return {
      columns: [{ label: 'User rate', field: 'rate' }],
      data: [
        {
          rate,
        },
      ],
    };
  }
}
