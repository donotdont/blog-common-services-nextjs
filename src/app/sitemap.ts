import { constants } from 'buffer';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const links: any = [
        {
            url: `${process.env.NEXT_PUBLIC_HOST}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/en/company/team`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/fr/company/team`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/en/company/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${process.env.NEXT_PUBLIC_HOST}/fr/company/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `https://common-services.com`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `https://common-services.com/fr/home-fr`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `https://store.common-services.com`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `https://store.common-services.com/fr`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `https://documentation.common-services.com`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
    ];

    // fetch data
    const posts = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/posts`).then((res) => res.json());

    posts.forEach((post: any) => {
        links.push({
            url: `${process.env.NEXT_PUBLIC_HOST}/${post.tag.slug}/${post.slugurl}`,
            lastModified: post.updated_at
        });
    })

    return links;
}