import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMICFACULTY_CREATED,
  EVENT_ACADEMICFACULTY_DELETED,
  EVENT_ACADEMICFACULTY_UPDATED,
} from './academicFaculty.contants';
import { IAcademicFacultyEvent } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const InitAcademicFacultyEvents = async () => {
  RedisClient.subscribe(EVENT_ACADEMICFACULTY_CREATED, async (e: string) => {
    const data: IAcademicFacultyEvent = JSON.parse(e);
    await AcademicFacultyService.createFacultyEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMICFACULTY_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicFacultyService.updateFacultyEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMICFACULTY_DELETED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicFacultyService.deleteFacultyEvents(data.id);
  });
};

export default InitAcademicFacultyEvents;
