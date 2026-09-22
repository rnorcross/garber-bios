import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";

export const allowedDomains = () =>
  (process.env.ALLOWED_EMAIL_DOMAINS || "")
    .split(",").map((d) => d.trim().toLowerCase().replace(/^@/, "")).filter(Boolean);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  pages: { signIn: "/signin", error: "/signin" },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ profile }) {
      const email = (profile?.email || "").toLowerCase();
      const domains = allowedDomains();
      if (!email || profile?.email_verified === false) return false;
      if (!domains.length) return false; // fail closed until ALLOWED_EMAIL_DOMAINS is set
      return domains.some((d) => email.endsWith("@" + d));
    },
  },
};

export const getSession = () => getServerSession(authOptions);
