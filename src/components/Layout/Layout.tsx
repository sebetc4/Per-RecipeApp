import React, { ReactNode } from 'react';
import { Header } from '..';

interface ILayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
