import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMICSEMESTER_CREATED,
  EVENT_ACADEMICSEMESTER_DELETED,
  EVENT_ACADEMICSEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const InitAcademicSemesterEvents = async () => {
  RedisClient.subscribe(EVENT_ACADEMICSEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromRedisEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMICSEMESTER_UPDATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.updateAcademicSemesterEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMICSEMESTER_DELETED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.deleteAcademicSemesterEvent(data.id);
  });
};

export default InitAcademicSemesterEvents;
