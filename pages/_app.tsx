
import "@/styles/globals.css";
import "@/styles/Header.css";
import "@/styles/Dropdown.css";
import "@/styles/Aside.css";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
