import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../src/components';
import { CustomThemeProvider } from '../src/providers';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <Head>
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1, shrink-to-fit=no'
                    />
                    <link
                        rel='shortcut icon'
                        href='/favicon.png'
                        key='shortcutIcon'
                    />
                    <link
                        rel='manifest'
                        href='/manifest.json'
                    />
                </Head>
            </Head>
            <CustomThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CustomThemeProvider>
        </>
    );
}
