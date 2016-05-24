import { Reducer, Action } from '@ngrx/store';
import { Room } from '../models';

export const SEED_ROOMS = 'SEED_JOINED_ROOMS';
export const UPDATE_ROOMS = 'UPDATE_ROOM';
export const LEFT_ROOMS = 'LEFT_ROOM';
export const JOINED_ROOM = 'JOINED_ROOM';

export const rooms: Reducer<Room[]> = (
  state: any = [],
  action: Action
) => {
  switch (action.type) {
    case SEED_ROOMS:
      return RoomParser.parse(action.payload);
    default:
      return state;
  }
}

class RoomParser {
  static parse (json): Room[] {
    var rooms: Room[] = [];
    Object.keys(json).forEach( (id) => {
      rooms.push(Object.assign(new Room(), {id: id}, json[id]))
    });
    return rooms;
  }
}

