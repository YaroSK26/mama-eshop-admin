// app/layout.tsx
import "../styles/globals.css";

// page/_app.tsx
import { ClerkProvider } from "../node_modules/@clerk/nextjs";
import type { AppProps } from "../node_modules/next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;