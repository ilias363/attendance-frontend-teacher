import { createApiResource } from "./base";
import {
  CreateAttendance,
  Attendance,
  UpdateAttendance,
  DailyAttendance,
  AttendanceHourlyWeek,
} from "../types/attendance";
import { fetchData } from "./main";
export const attendanceApiResource = createApiResource<
  Attendance,
  CreateAttendance,
  UpdateAttendance
>("attendances");

export const getAllAttendances = () => attendanceApiResource.list();
export const getAttendance = (id: string) => attendanceApiResource.get(id);
export const getAttendanceByStudentId = async (id: string) => {
  const attendances = await fetchData<Attendance[]>(`${process.env.API_URL}/attendances/students/${id}`, {method: "GET"});
  return attendances;
}
export const addAttendance = (data: CreateAttendance) =>
  attendanceApiResource.create(data);
export const editAttendance = (id: string, data: UpdateAttendance) =>
  attendanceApiResource.update(id, data);
export const deleteAttendance = (id: string) =>
  attendanceApiResource.delete(id);

export const getAttendanceLast30Days = async () =>
  attendanceApiResource.getResource<DailyAttendance[]>(
    "attendance-last-30-days"
  );
export const getAttendanceThisWeek = async () =>
  attendanceApiResource.getResource<DailyAttendance[]>("attendance-week");
export const getAttendanceHourlyThisWeek = async () =>
  attendanceApiResource.getResource<AttendanceHourlyWeek[]>(
    "attendance-hourly-week"
  );
