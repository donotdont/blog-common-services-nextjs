import { Category } from "@mui/icons-material";
import RSS from "rss";

export async function GET() {

    const feed: any = new RSS({
        title: "Blog Common-Services",
        description: "Modules, extensions, addons, plugins for Prestashop, Oscommerce, Open Cart, Magento, Shopify.",
        generator: 'RSS for Node and Next.js',
        feed_url: `${process.env.NEXT_PUBLIC_HOST}/feed.rss`,
        site_url: `${process.env.NEXT_PUBLIC_HOST}`,
        managingEditor: 'don@common-services.com (don)',
        webMaster: 'don@common-services.com (don)',
        copyright: `Copyright ${new Date().getFullYear().toString()}, Common-Services`,
        language: 'en-US',
        pubDate: new Date().toUTCString(),
        ttl: 60,
    });

    // fetch data
    const posts = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/posts`).then((res) => res.json());

    if (posts) {
        posts.map((post: any) => {
            let new_categories: any = [];
            if (post.categories && post.categories.length > 0)
                post.categories.forEach((category: any) => {
                    if (category.name)
                        new_categories.push(category.name);
                });

            feed.item({
                title: post.title,
                description: post.meta_description,
                url: `${process.env.NEXT_PUBLIC_HOST}/${post.tag.slug}/${post.slugurl}`,
                categories: new_categories || [],
                author: post.user.first_name + ' ' + post.user.last_name,
                date: post.date,
            });
        });
    }

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}