import Head from "next/head";

interface DynamicHead {
   title: string;
}

export function DynamicHead({ title }: DynamicHead) {
    return (
        <Head>
            <title>{title} | moviedocs</title>
        </Head>
    )
}