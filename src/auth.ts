import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: '',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '***',
        },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = (await res.json()) as {
          token: string;
          refreshToken: string;
        };

        if (!data.token) {
          throw new Error('No data returned from the API');
        }

        return {
          email: credentials.email as string,
          name: JSON.stringify(res),
          token: data.token,
          refreshToken: data.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      console.log(session, token, user);

      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
          address: '17 Phu Kieu', // Example address
        },
      };
    },
  },
  // Đảm bảo sử dụng JWT strategy
  session: {
    strategy: 'jwt',
  },
  // Đặt secret key của bạn
  secret: process.env.NEXTAUTH_SECRET,
});
