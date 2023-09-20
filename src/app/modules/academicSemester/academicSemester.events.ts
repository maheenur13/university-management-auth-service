import { RedisClient } from '../../../shared/redis';
import { EVENT_ACADEMICSEMESTER_CREATED } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const InitAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMICSEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e);
    await AcademicSemesterService.createSemesterFromRedisEvent(data);
  });
};

export default InitAcademicSemesterEvents;
