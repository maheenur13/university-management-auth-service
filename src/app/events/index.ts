import InitAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartment.events';
import InitAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import InitAcademicSemesterEvents from '../modules/academicSemester/academicSemester.events';

const subscribeToRedisEvents = () => {
  InitAcademicSemesterEvents();
  InitAcademicFacultyEvents();
  InitAcademicDepartmentEvents();
};

export default subscribeToRedisEvents;
