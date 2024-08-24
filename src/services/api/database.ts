import { axiosInstance } from "@/lib/axiosInstance";
import { parseISO, format } from "date-fns";

type Props = {
  cookie: string;
  startDate?: Date;
  endDate?: Date;
  startHour?: Date;
  endHour?: Date;
  stationFilter?: string;
  page?: string;
  limit?: string;
};

export const getDatabaseList = async ({
  cookie,
  startDate,
  endDate,
  startHour,
  endHour,
  stationFilter,
  page = "1",
  limit = "10",
}: Props) => {
  const params = new URLSearchParams();

  if (startDate && endDate) {
    const formattedFromDate = format(
      parseISO(startDate.toISOString()),
      "yyyy-MM-dd",
    );
    const formattedToDate = format(
      parseISO(endDate.toISOString()),
      "yyyy-MM-dd",
    );
    params.append("startDate", formattedFromDate);
    params.append("endDate", formattedToDate);
  }

  if (startHour && endHour) {
    const formattedStartHour = format(startHour, "HH:mm:ss");
    const formattedEndHour = format(endHour, "HH:mm:ss");
    params.append("startHour", formattedStartHour);
    params.append("endHour", formattedEndHour);
  }

  if (stationFilter && stationFilter !== "all") {
    params.append("namaStasiun", stationFilter);
  }

  params.append("limit", limit);
  const offset = (parseInt(page) - 1) * parseInt(limit);
  params.append("offset", offset.toString());

  const res = await axiosInstance.get<DatabaseResponse>(
    `/api/data/klhk/list?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    },
  );

  return res.data;
};

export const exportDatabase = async ({
  cookie,
  startDate,
  endDate,
  startHour,
  endHour,
}: Props) => {
  const params: { [key: string]: string } = {};

  if (startDate && endDate) {
    const formattedFromDate = format(
      parseISO(startDate.toISOString()),
      "yyyy-MM-dd",
    );
    const formattedToDate = format(
      parseISO(endDate.toISOString()),
      "yyyy-MM-dd",
    );
    params["startDate"] = formattedFromDate;
    params["endDate"] = formattedToDate;
  }

  if (startHour && endHour) {
    const formattedStartHour = format(startHour, "HH:mm:ss");
    const formattedEndHour = format(endHour, "HH:mm:ss");
    params["startHour"] = formattedStartHour;
    params["endHour"] = formattedEndHour;
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return await axiosInstance.get<DatabaseExport>(
    `/api/data/klhk/export?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      responseType: "blob",
    },
  );
};
