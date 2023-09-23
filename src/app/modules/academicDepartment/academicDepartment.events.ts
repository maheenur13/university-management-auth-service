import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMICDEPARTMENT_CREATED,
  EVENT_ACADEMICDEPARTMENT_DELETED,
  EVENT_ACADEMICDEPARTMENT_UPDATED,
} from './academicDepartment.constants';
import { IAcademicDepartmentEvent } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const InitAcademicDepartmentEvents = async () => {
  RedisClient.subscribe(EVENT_ACADEMICDEPARTMENT_CREATED, async (e: string) => {
    const data: IAcademicDepartmentEvent = JSON.parse(e);
    await AcademicDepartmentService.createDepartmentEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMICDEPARTMENT_UPDATED, async (e: string) => {
    const data: IAcademicDepartmentEvent = JSON.parse(e);
    await AcademicDepartmentService.updateDepartmentEvent(data);
  });
  RedisClient.subscribe(EVENT_ACADEMICDEPARTMENT_DELETED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicDepartmentService.deleteDepartmentEvent(data.id);
  });
};

export default InitAcademicDepartmentEvents;
