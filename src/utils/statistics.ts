import { sum, map } from "lodash/fp";
import moment from "moment";

export interface Log {
  startTime?: Date | number;
  endTime?: Date | number;
  duration?: number;
  id?: string;
}

export const avg = (data: number[]) =>
  Number((sum(data) / data.length).toFixed(2));

export const activeRequests = () =>
  Object.keys(statistics).reduce(
    (
      actives: {
        [method: string]: {
          count: number;
        };
      },
      method: string
    ) => {
      const stats = statistics[method];

      // total active requests by HTTP Method
      actives[method] = {
        count: stats.filter(s => !s.endTime /* no end time yet */).length
      };
      return actives;
    },
    {}
  );

export const totalRequests = () =>
  Object.keys(statistics).reduce(
    (
      totals: {
        [method: string]: {
          count: number;
          avg_duration: number;
        };
      },
      method: string
    ) => {
      const stats = statistics[method];

      // total requests by HTTP Method
      totals[method] = {
        count: stats.length,
        avg_duration:
          avg(map("duration", stats.filter(s => s.duration)) as number[]) || 0
      };
      return totals;
    },
    {}
  );

export const lastHourRequests = () =>
  Object.keys(statistics).reduce(
    (
      lastHours: {
        [method: string]: {
          count: number;
          avg_duration: number;
        };
      },
      method: string
    ) => {
      const stats = statistics[method].filter(
        s => moment().diff(moment(s.startTime), "hours") <= 1
      );

      // last hour requests by HTTP Method
      lastHours[method] = {
        count: stats.length,
        avg_duration:
          avg(map("duration", stats.filter(s => s.duration)) as number[]) || 0
      };
      return lastHours;
    },
    {}
  );

export const lastMinuteRequests = () =>
  Object.keys(statistics).reduce(
    (
      lastMinutes: {
        [method: string]: {
          count: number;
          avg_duration: number;
        };
      },
      method: string
    ) => {
      const stats = statistics[method].filter(
        s => moment().diff(moment(s.startTime), "minutes") <= 1
      );

      // last minute requests by HTTP Method
      lastMinutes[method] = {
        count: stats.length,
        avg_duration:
          avg(map("duration", stats.filter(s => s.duration)) as number[]) || 0
      };
      return lastMinutes;
    },
    {}
  );

export const statistics: {
  [method: string]: Log[];
} = {};

export const getStats = () => ({
  total: totalRequests(),
  active: activeRequests(),
  lastHour: lastHourRequests(),
  lastMinute: lastMinuteRequests()
});
