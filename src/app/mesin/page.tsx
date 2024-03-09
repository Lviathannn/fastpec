import DeviceTableSection from "@/components/section/DeviceTableSection";
import { auth } from "@/lib/auth";
import { getDeviceTableList } from "@/services/api/device";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Station() {
  const queryClient = new QueryClient();
  const session = await auth();

  await queryClient.prefetchQuery({
    queryKey: ["device"],
    queryFn: async () => {
      const res = await getDeviceTableList(
        session?.user.token.access_token as string,
      );
      return res;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DeviceTableSection />
    </HydrationBoundary>
  );
}
