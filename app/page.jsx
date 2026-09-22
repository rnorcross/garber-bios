import Script from "next/script";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { BODY } from "@/lib/body";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await getSession())) redirect("/signin");
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" strategy="afterInteractive" />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
