import {get} from '../../../api/index';

export const getAllEvents = async () => {
  return await get('events');
};
