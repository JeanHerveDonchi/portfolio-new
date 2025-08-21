import { client } from "../data/content.js";

export const fetchEntries = async () => {
    try {
        const entries = await client.getEntries({
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
        throw `Error fetching entries for content type ${error.message}`;
    }
}

export const fetchAssets = async () => {
    try {
        const assets = await client.withoutLinkResolution.withAllLocales.getAssets()
        return assets.items;
    } catch (error) {
        throw `Error fetching assets for content type ${error.message}`;
    }
}