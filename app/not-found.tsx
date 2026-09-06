import { NotFound } from "@/modules/not-found/NotFound";

export const metadata = {
  title: "404",
};

export default function Page() {
  return <NotFound />;
}
