import InitAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import InitAcademicSemesterEvents from '../modules/academicSemester/academicSemester.events';

const subscribeToRedisEvents = () => {
  InitAcademicSemesterEvents();
  InitAcademicFacultyEvents();
};

export default subscribeToRedisEvents;
