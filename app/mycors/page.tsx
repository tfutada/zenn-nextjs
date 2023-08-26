'use client';

import React, {useState, useEffect} from 'react';

export default function GithubUser() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const apiUrl = "/proxy-api/api-void"
    const apiUrl = "/proxy-api/search?q=nextjs"
    // const apiUrl = "https://api.github.com/users/herozhou"
    // const apiUrl = "https://www.google.com" // CORS error

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>failed to load</div>;
    }

    return <div>hello {data?.name}!</div>;
}
