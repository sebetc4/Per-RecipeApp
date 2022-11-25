import { useRouter } from 'next/router';
import React from 'react';

export default function UserDetails() {
    // Hooks
    const router = useRouter();

    const { userId } = router.query;

    return <div>Détail de l'utilisateur {userId}</div>;
}
