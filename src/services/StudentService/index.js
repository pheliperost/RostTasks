import {get} from '../../../api/index';

export const getAllStudents = async () => {
  return await get('students');
};
