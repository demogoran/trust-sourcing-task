export class PageInfo {
  id: number;
  name: string;
  visitTime?: number;
}

export class EventInfo {
  eventtype: string;
  pageid?: number;
  userid?: string;
  timestamp?: number;
  browser?: string;
  country?: string;
}
