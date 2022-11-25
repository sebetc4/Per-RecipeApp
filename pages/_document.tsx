import NextDocument, { Head, Html, DocumentContext, DocumentInitialProps, Main, NextScript } from "next/document";

// https://nextjs.org/docs/advanced-features/custom-document
// https://stackoverflow.com/questions/67087999/how-to-properly-type-the-document-tsx-file-from-next-js


type Props = {};

class Document extends NextDocument<Props> {

    render() {
        return (
            <Html lang='fr'>
                <Head>
                    <link
                        rel='shortcut icon'
                        href='/favicon.png'
                        key='shortcutIcon'
                    />
                    <link
                        rel='manifest'
                        href='/manifest.json'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='true'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Charmonman:wght@400;700&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
