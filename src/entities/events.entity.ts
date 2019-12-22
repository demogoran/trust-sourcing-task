import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  eventtype: string;

  @Column()
  browser: string;

  @Column()
  country: string;

  @Column()
  pageid: number;

  @Column()
  userid: string;

  @Column()
  timestamp: number;
}
