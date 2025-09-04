import { client } from "../data/content.js";

export const fetchProjectEntries = async () => {
    try {
        const entries = await client.withoutUnresolvableLinks.getEntries({
            content_type: 'projects',
        })
        return entries.items.map(entry => ({
            id: entry.sys.id,
            categories: entry.fields.categories,
            links: entry.fields.links,
            projectDescription: entry.fields.projectDescription,
            projectName: entry.fields.projectName,
            banner: entry.fields.projectBanner.fields
        }));
    } catch (error) {
        throw new Error(`Error fetching entries for content type ${error.message}`);
    }
}

export const fetchBlogPostEntries = async () => {
    try {
        const bpEntries = await client.withoutUnresolvableLinks.getEntries({
            content_type: 'blogPost',
        })
        return bpEntries.items.map(entry => ({
            id: entry.sys.id,
            title: entry.fields.title,
            coverImage: entry.fields.coverImage.fields,
            category: entry.fields.category,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt
        }));
    } catch (error) {
        throw new Error(`Error fetching entries for content type ${error.message}`);
    }
}

